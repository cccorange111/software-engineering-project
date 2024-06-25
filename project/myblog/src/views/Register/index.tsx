import React from 'react'
import styles from "./Register.module.scss"
import { Card, Button, Checkbox, Form, type FormProps, Input, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { reqRegister } from '@/api/index'

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
    console.log('styles', styles);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



export default function index() {
    const [adminInfo, setadminInfo] = useState({
        account: "",
        password: "",
    });
    //store
    const navigate = useNavigate();

    const register = async () => {
        let result = await reqRegister({
            account: adminInfo.account,
            password: adminInfo.password
        });
        console.log("注册的结果", result)
        if (result.code == 200) {
            message.success("注册成功");
            navigate('/login');
        } else {
            if (result.code == 400) {
                message.error("用户名已存在");
            } else message.error("注册失败")
            setadminInfo({
                account: "",
                password: "",
            })
        }
    };

    const toLogin = () => {
        navigate('/login');
    }
    return (
        <div>
            <Card
                style={{ maxWidth: 500 }}
                bordered
                className={styles.card}
            >
                <Form

                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 500 }}
                    initialValues={{ password: "", account: "" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="account"
                        name="account"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input placeholder="请输入用户名" onChange={(e) => setadminInfo({ ...adminInfo, account: e.target.value })} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="password"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password placeholder='请输入密码' onChange={(e) => setadminInfo({ ...adminInfo, password: e.target.value })} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit" onClick={register}>
                                提交
                            </Button>
                            <Button type="primary" onClick={toLogin}>
                                登录
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
