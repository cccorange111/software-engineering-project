import MarkDown from '@/components/MarkDown/index';
import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Radio,
} from 'antd';
import { reqAddArticle, reqCategoryList } from '@/api/index'
import UploadComp from '@/components/Upload/index'
type SizeType = Parameters<typeof Form>[0]['size'];

export default function index() {

    const [form] = Form.useForm()
    //设置分类选项
    const [categortyOptions, setcategortyOptions] = useState([]);
    const [article, setarticle] = useState("")
    const [categortyId, setcategortyId] = useState("")
    const navigate = useNavigate();
    const add = async () => {
        const formData = form.getFieldsValue();
        console.log("222", formData);
        //整合数据
        let id = localStorage.getItem('userId');
        let data = { ...formData, categoryId: categortyId, content: article, user_id: id }
        console.log("hebingshuju", data);
        let res = await reqAddArticle(data);
        if (res.code == 200) {
            message.success(res.msg);
            navigate('/home/page301');
        } else {
            message.error(res.msg);
        }
    };

    //读取分类选项
    const loadCategorys = async () => {
        let id = localStorage.getItem('userId');
        let res = await reqCategoryList(id);
        if (res.code == 200) {
            setcategortyId(res.rows[0]?.id);
            setcategortyOptions(res.rows.map((item) => {
                //此处的操作是为了配合ui框架的key
                return {
                    label: item.name,
                    value: item.id,
                };
            }));
        }
    };

    useEffect(() => {
        loadCategorys();
        return () => {

        }
    }, [])

    //获取到富文本编辑器的内容
    const onGetcontent = (value) => {
        setarticle(value)
    }
    const handleSeletChange = (key) => {
        //key的值是select的value
        setcategortyId(key);
    }


    return (
        <div>
            <div className="form">
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size={'default' as SizeType}
                    style={{ maxWidth: 600 }}
                    initialValues={{ value: "", catergory: categortyOptions[0]?.value || "" }}

                >
                    <Form.Item label="title" name="title" rules={[{ required: true }]}>
                        <Input placeholder="请输入文章标题" />
                    </Form.Item>
                    <Form.Item label="categoryId" rules={[{ required: true }]}>
                        <Select
                            key={categortyOptions[0]?.value}
                            defaultValue={categortyOptions[0]?.value}
                            options={categortyOptions}
                            onChange={handleSeletChange}
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
                    <Form.Item label="Upload" >
                        <Button onClick={add}>提交</Button>
                    </Form.Item>
                    <Form.Item label="上传文件(可选)" >
                        < UploadComp />
                    </Form.Item>
                </Form>
                <MarkDown onGetcontent={onGetcontent} />
            </div>

        </div >
    )
}

