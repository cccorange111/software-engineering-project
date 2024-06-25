import React, { useState } from 'react';
import { Layout, Menu, theme, FloatButton, ConfigProvider, Card } from 'antd';
import type { MenuProps } from 'antd';
import { MailOutlined, HomeOutlined, UserOutlined, UnorderedListOutlined, SunOutlined, CloudOutlined, SmileOutlined, MoonOutlined } from '@ant-design/icons';
import { menu } from './blog.module.scss'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;


const sharedStyle = { flex: "0 0 50px", height: 20, background: "blue" };
const App: React.FC = () => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [current, setCurrent] = useState('mail');
    const [curtheme, setCurTheme] = useState(true);
    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key != "change") {
            console.log("$$$e", e.key)
            setCurrent(e.key);
            navigate(e.key);
        } else {
            changeTheme();
        }
    };
    const changeTheme = () => {
        setCurTheme(!curtheme);
    }
    const items: MenuProps['items'] = [
        {
            label: '文章',
            key: '/blog/article',
            icon: <MailOutlined />,
        },
        {
            label: '分类',
            key: '/blog/catergoty',
            icon: <UnorderedListOutlined />
        },

        {
            label: 'Admin',
            key: '/home/page1',
            icon: <UserOutlined />,
        },

    ];
    return (

        <ConfigProvider
            theme={{
                // 1. 单独使用暗色算法
                algorithm: curtheme ? theme.defaultAlgorithm : theme.darkAlgorithm

                // 2. 组合使用暗色算法与紧凑算法
                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}

        >
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme="light" className={menu}
                style={{ minWidth: 0, flex: "auto" }} />

            <Layout>
                <Content style={{ padding: '0 48px' }}>
                    <Card bordered={false} style={{ marginTop: "10px" }}>
                        <div
                            style={{
                                minHeight: 380,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                            <FloatButton.BackTop />
                        </div>
                    </Card>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>

        </ConfigProvider>

    );
};

export default App;