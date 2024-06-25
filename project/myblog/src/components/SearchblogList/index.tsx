import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination, message } from 'antd';
import styles from './SearchblogList.module.scss';
import { reqAllBlog, reqDeleteBlog } from '@/api/index'
import { useNavigate } from 'react-router-dom';
import { MdEditor, MdPreview } from 'md-editor-rt';

import 'md-editor-rt/lib/preview.css';

export default function index({ categoryId = "" }) {
    //博客列表
    const [blogList, setblogList] = useState([]);
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
    const loadblog = async (page = 1) => {
        if (page != 1) {
            setpageInfo({
                ...pageInfo,
                page: page
            })
        }
        let reqBody = { keyword: pageInfo.keyword, page: page, pageSize: pageInfo.pageSize, categoryId: categoryId };
        console.log('reqBody', reqBody);
        let res = await reqAllBlog(reqBody);
        let data = res.data.rows;

        for (let row of data) {
            //此处码住，之后用长度更长的文章测试下
            if (row.content.length > 50) row.content += "..."
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
    const toDetail = (id) => {
        navigate(`/blog/detail?id=${id}`);
    }
    useEffect(() => {
        loadblog(pageInfo.page);
    }, [])
    const handlePaginationChange = (page) => {
        loadblog(page);
    }
    return (
        <div className={styles.content}>

            <div className={styles.title}>
                {
                    blogList.map((blog, index) => (
                        <div className={styles.card}
                            key={blog.id}
                            onClick={() => toDetail(blog.id)}
                        >
                            {blog.title}
                            {/* <div className={styles.article}>
                            <MdPreview editorId={"key" + blog.id} modelValue={blog.content} />
                        </div> */}

                        </div>

                    ))
                }
            </div>
            <div className={styles.pagination}><Pagination defaultCurrent={pageInfo.page} total={pageInfo.count} defaultPageSize={pageInfo.pageSize} onChange={(page) => handlePaginationChange(page)} /></div>
        </div>
    )
}

