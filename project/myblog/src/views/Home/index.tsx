import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import MainMenu from '@/components/MainMenu/index'
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左边侧边栏 */}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <MainMenu />
            </Sider>
            {/* 右边内容 */}
            <Layout>
                {/* 右边内容 */}
                <Content style={{ margin: '16px 16px 0' }}>

                    <div
                        style={{
                            padding: 24,
                            minHeight: 790,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* 窗口部分 */}
                        <Outlet />
                    </div>
                </Content>
                {/* 右边底部 */}
                <Footer style={{ textAlign: 'center', padding: '0', lineHeight: '48px' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout >
    );
};

export default App;