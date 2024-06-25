import MarkDown from '@/components/MarkDown/index';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Radio
} from 'antd';
import { reqBlog, reqUpdateBlog, reqCategoryList } from '@/api/index'
type SizeType = Parameters<typeof Form>[0]['size'];

export default function index() {
    const location = useLocation();
    const [form] = Form.useForm();
    const [id, setid] = useState("");
    //设置分类选项
    const [categortyOptions, setcategortyOptions] = useState([]);
    const [article, setarticle] = useState("");
    const [newArticle, setnewArticle] = useState("");
    const navigate = useNavigate();
    const updateData = async () => {
        const formData = form.getFieldsValue();
        //整合数据
        let data = { id: id, ...formData, content: newArticle }
        console.log(data);
        let res = await reqUpdateBlog(data);
        if (res.code == 200) {
            message.success(res.msg);
            navigate('/home/page301');
        } else {
            message.error(res.msg);
        }
    }
    const getContent = async () => {
        //获取search参数
        let params = new URLSearchParams(location.search);
        let id = params.get('id');
        setid(id);
        let res = await reqBlog(id);
        if (res.code == 200) {
            setarticle(res.rows[0]?.content);
            setnewArticle(res.rows[0]?.content);
            //异步设置form表单的初始值
            form.setFieldsValue({
                title: res.rows[0]?.title,
                categoryId: res.rows[0]?.category_id,
                authority: res.rows[0]?.authority
            })
        }
    }
    useEffect(() => {
        getContent();
        loadCategorys();
    }, []);
    //读取分类选项
    const loadCategorys = async () => {
        let id = localStorage.getItem('userId');
        let res = await reqCategoryList(id);
        if (res.code == 200) {
            setcategortyOptions(res.rows.map((item) => {
                //此处的操作是为了配合ui框架的key
                return {
                    label: item.name,
                    value: item.id,
                };
            }));
        }
    };
    //获取到富文本编辑器的内容
    const onGetcontent = (value) => {

        setnewArticle(value)
    }

    return (
        <div>
            <div>
                <div className="form">
                    <Form
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        size={'default' as SizeType}
                        style={{ maxWidth: 600 }}

                    >
                        <Form.Item label="title" name="title" >
                            <Input placeholder="请输入文章标题" />
                        </Form.Item>
                        <Form.Item label="categoryId" name="categoryId">

                            <Select
                                options={categortyOptions}
                            // onChange={handleSeletChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name="authority"
                            label="authority"
                            rules={[{ required: true, message: 'Please pick an item!' }]}
                        >
                            <Radio.Group >
                                <Radio.Button value="0">私有</Radio.Button>
                                <Radio.Button value="1">公开</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Button" >
                            <Button onClick={updateData}>提交</Button>
                        </Form.Item>


                    </Form>
                    <MarkDown modelValue={article} onGetcontent={onGetcontent} />
                </div>

            </div >

        </div >
    )
}

