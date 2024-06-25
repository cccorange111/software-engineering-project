import React from 'react'
import styles from "./Login.module.scss"
import { Card, Button, Checkbox, Form, type FormProps, Input, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { addAdimin } from '@/store/AdminSlice/AdminSlice'
import { reqUserInfo } from '@/api/index'
import { adminInfo } from "./type"
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
    const [adminInfo, setadminInfo] = useState<adminInfo>({
        account: localStorage.getItem("account") || "",
        password: localStorage.getItem("password") || "",
        remember: localStorage.getItem("remember") === "1" || false,
    });
    //message
    const [messageApi, contextHolder] = message.useMessage();
    //store
    const adminStore = useSelector(state => state.Admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async () => {
        let result = await reqUserInfo({
            account: adminInfo.account,
            password: adminInfo.password
        });
        if (result.code === 200) {
            dispatch(addAdimin({
                token: result.data.token,
                account: result.data.account,
                password: result.data.password
            }))
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("userId", result.data.userId);
            if (adminInfo.remember) {
                localStorage.setItem("password", adminInfo.password);
                localStorage.setItem("account", adminInfo.account);

                localStorage.setItem("remember", adminInfo.remember ? "1" : "0");
            }
            message.success("登录成功");
            navigate('/home/page1');
        } else {
            message.success("登录失败");
        }
    };
    const toRegister = () => {
        navigate('/register');
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
                    initialValues={{ remember: adminInfo.remember, password: adminInfo.password, account: adminInfo.account }}
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

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox onChange={(e) => setadminInfo({ ...adminInfo, remember: e.target.checked })}>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                            <Button type="primary" htmlType="submit" onClick={login}>
                                Submit
                            </Button>
                            <Button type="primary" onClick={toRegister}>
                                注册
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
