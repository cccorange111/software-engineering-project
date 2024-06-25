import React from 'react'
import styles from "./index.module.scss"
import { Card, Button, Modal, Checkbox, Form, type FormProps, Input, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { addAdimin } from '@/store/AdminSlice/AdminSlice'
import { reqUpdatUserInfo } from '@/api/index'
import Password from 'antd/es/input/Password';



export default function index() {
    const [adminInfo, setAdminInfo] = useState({
        account: localStorage.getItem("account") || "",
        password: localStorage.getItem("password") || "",
        updatedAdmin: localStorage.getItem("account") || "",
        password1: "",
        password2: "",
    });
    //message
    const [messageApi, contextHolder] = message.useMessage();
    //添加
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    //修改
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const changeadmin = () => {
        setIsAdminModalOpen(true);
    }
    const changePassword = () => {
        setIsModalOpen(true);
    }
    const changeAdminInput = (e) => {
        setAdminInfo({
            ...adminInfo,
            updatedAdmin: e.target.value
        })

    }
    const handleAdminOk = async () => {
        setIsAdminModalOpen(false);
        let res = await reqUpdatUserInfo({
            account: adminInfo.account,
            new_account: adminInfo.updatedAdmin,
            password: adminInfo.password
        })
        if (res.code === 200) {
            localStorage.setItem("account", adminInfo.updatedAdmin);
            message.success("修改成功");
        }
    }
    const handleAdminCancel = () => {
        setIsAdminModalOpen(false);
        setAdminInfo({
            ...adminInfo,
            updatedAdmin: localStorage.getItem("account") || ""
        })
    }
    //修改密码
    const handleOk = async () => {
        setIsModalOpen(false);
        if (adminInfo.password1 === adminInfo.password2) {
            let res = await reqUpdatUserInfo({
                account: adminInfo.account,
                new_account: adminInfo.account,
                password: adminInfo.password1
            })
            if (res.code === 200) {
                localStorage.setItem("password", adminInfo.password1);
                message.success("修改成功");
            }
        } else {
            message.error("请输入相同的密码");
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setAdminInfo({
            ...adminInfo,
            password1: "",
            password2: "",
        })
    }

    const changePassword1 = (e) => {
        setAdminInfo({
            ...adminInfo,
            password1: e.target.value
        })
    }
    const changePassword2 = (e) => {
        setAdminInfo({
            ...adminInfo,
            password2: e.target.value
        })
    }
    return (
        <div >
            <Card
                style={{ width: " 80% ", height: "600px" }}

            >
                <div className={styles.user}>用户名：{adminInfo.account}</div>
                <div>
                    <Space>
                        <Button onClick={changeadmin}>
                            修改
                        </Button>
                        <Button onClick={changePassword}>
                            修改密码
                        </Button>
                    </Space>
                </div>
                <Modal title="修改用户名" open={isAdminModalOpen} onOk={handleAdminOk} onCancel={handleAdminCancel}>
                    <Input placeholder="请输入分类名称" onChange={changeAdminInput} value={adminInfo.updatedAdmin} />
                </Modal>
                {/* 修改密码的Modal */}
                <Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input placeholder="请输入密码" onChange={changePassword1} value={adminInfo.password1} />
                    <Input placeholder="请输入再次" onChange={changePassword2} value={adminInfo.password2} />
                </Modal>
            </Card>




        </div>
    )
}
