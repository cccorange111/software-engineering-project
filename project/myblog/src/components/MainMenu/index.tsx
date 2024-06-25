import React, { useState, useEffect } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAdimin } from '@/store/AdminSlice/AdminSlice'
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('个人信息', '/home/page1', <PieChartOutlined />),
    getItem('分类管理', '/home/page2', <DesktopOutlined />),
    getItem('文章管理', 'sub1', <UserOutlined />, [
        getItem('文章列表', '/home/page301'),
        getItem('添加文章', '/home/page302'),
    ]),
    getItem('评论管理', '/home/page401', <UserOutlined />),
    getItem('退出登录', '/login', <PieChartOutlined />),
    getItem('博客首页', '/blog/homepage', <PieChartOutlined />),
];

const App: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    //二级菜单刷新后样式丢失的解决方法，需要控制setopenKeys的初始值对应上当前的路径
    let originOpenKey: string = "";
    function findeKey(obj: { key: string }) {
        return obj.key === location.pathname;
    }
    for (let i = 0; i < items.length; i++) {
        if (items[i]!['children'] && items[i]!['children'].length && items[i]!['children'].find(findeKey)) {
            originOpenKey = items[i]!.key as string;
        }
    }
    //定义展开菜单keys的数组
    const [openKeys, setopenKeys] = useState([originOpenKey]);
    //定义选中的keys数组
    const [selectedKeys, setselectedKeys] = useState([location.pathname]);
    //点击菜单栏
    const menuClick = (path: { key: string }) => {
        if (path.key === '/login') {
            //需要清空一些登录的状态
            localStorage.setItem("token", "");
            dispatch(addAdimin({
                token: "",
                account: "",
                password: ""
            }))
        }
        //点击跳转到对应的路由
        navigate(path.key);
    }
    //菜单栏展开关闭的回调
    const handleOpenChange = (keys: string[]) => {
        //keys是一个数组，记录当前哪一项是展开的
        //把数组修改成最后一项。
        setopenKeys([keys[keys.length - 1]]);
    }
    useEffect(() => {
        setselectedKeys([location.pathname]);
    }, [location.pathname]);
    return (
        <Menu onOpenChange={handleOpenChange} openKeys={openKeys} theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} onClick={menuClick} selectedKeys={selectedKeys} />
    );
};

export default App;
