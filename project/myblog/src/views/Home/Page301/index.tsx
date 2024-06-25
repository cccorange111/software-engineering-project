import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination, message, Input, Select, Space } from 'antd';
import styles from './Page301.module.scss';
import { reqAllBlog, reqDeleteBlog } from '@/api/index'
import { useNavigate } from 'react-router-dom';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
const { Search } = Input;
const options = [
    {
        value: 'title',
        label: '标题',
    },
    {
        value: 'keyword',
        label: '关键字',
    },
    {
        value: 'content',
        label: '内容',
    },
    {
        value: 'create_time',
        label: '日期(格式:xx,yy,zz)',
    },
    {
        value: 'authority',
        label: '权限(0 私有, 1 公有)',
    },
];
export default function index() {
    //博客列表
    const [blogList, setblogList] = useState([]);
    const [searchKeyword, setsearchKeyword] = useState("title");
    const [searchContent, setSearchContent] = useState("");
    const [pageInfo, setpageInfo] = useState({
        page: 1,
        pageSize: 3,
        pageCount: 0,
        count: 0,
        keyword: "",
        categoryId: 0,
    })

    const navigate = useNavigate();
    //查询博客,默认查询
    const loadblog = async (page: number = 1, searchKeyword: string, searchContent: string) => {
        if (page != 1) {
            setpageInfo({
                ...pageInfo,
                page: page
            })
        }
        let id = localStorage.getItem('userId');
        let reqBody = { keyword: pageInfo.keyword, page: page, pageSize: pageInfo.pageSize, categoryId: pageInfo.categoryId, user_id: id, [searchKeyword]: searchContent };
        let res = await reqAllBlog(reqBody);
        let data = res.data.rows;
        for (let row of data) {
            console.log("length", row.content.length);
            //此处码住，之后用长度更长的文章测试下
            if (row.content.length > 50) {
                row.content = row.content.slice(0, 51);
                row.content += "...";
            }
            // 把时间戳转换为年月日
            let d = new Date(row.create_time)
            row.create_time = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
        }
        setblogList(data);
        let _pageCount = parseInt(pageInfo.count / pageInfo.pageSize) + (pageInfo.count % pageInfo.pageSize > 0 ? 1 : 0)
        setpageInfo({
            ...pageInfo,
            count: res.data.count,
            pageCount: _pageCount
        })
    };

    //携带参数id跳转到updata（page303）
    const gotoUpdata = async (blog) => {
        //跳转
        navigate(`/home/page303?id=${blog.id}`);
    };
    useEffect(() => {
        loadblog(pageInfo.page, searchKeyword, searchContent);
    }, [])
    const handlePaginationChange = (page) => {
        loadblog(page, searchKeyword, searchContent);
    }
    const deleteBlog = async (blog) => {
        let res = await reqDeleteBlog(blog.id);
        if (res.code == 200) {
            message.success(res.msg);
            loadblog();
        } else {
            message.error(res.msg);
        }
    }

    const search = () => {

    }
    return (
        <div className={styles.content}>
            <Space direction="vertical" size="middle" style={{ marginBottom: " 20px " }}>
                <Space.Compact>
                    <Select defaultValue="title" options={options} vlaue={searchKeyword} onChange={(key) => setsearchKeyword(key)} />
                    <Search placeholder="input search text" allowClear vlaue={searchContent} onChange={(e) => setSearchContent(e.target.value)} onSearch={() => loadblog(1, searchKeyword, searchContent)} />
                </Space.Compact>
            </Space>
            {
                blogList.map((blog, index) => (

                    <Card
                        title={`题目：${blog.title}`}
                        hoverable
                        style={{ width: " 80% " }}
                        key={blog.id}
                    >
                        <div>
                            <p>内容：</p>
                            <div className={styles.article} style={{ overflow: 'hidden' }}>
                                <MdPreview editorId={"key" + blog.id} modelValue={blog.content} />
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <div >
                                <span style={{ marginRight: "10px" }}>时间：{blog.create_time}</span>
                                <span>权限：{blog.authority == 1 ? "公有" : "私有"}</span>
                            </div>
                            <Button className={styles.button} onClick={() => gotoUpdata(blog)}>修改</Button>
                            <Button onClick={() => deleteBlog(blog)}>删除</Button>
                        </div>

                    </Card>
                ))
            }
            <Pagination defaultCurrent={pageInfo.page} total={pageInfo.count} defaultPageSize={pageInfo.pageSize} onChange={(page) => handlePaginationChange(page)} />
        </div>
    )
}
