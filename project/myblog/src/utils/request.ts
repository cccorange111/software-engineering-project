import axios from 'axios';
import { useSelector } from 'react-redux'
import { addAdimin } from '@/store/AdminSlice/AdminSlice'
//@ts-ignore
import { message } from 'antd';
// import useUserStore from '@/store/modules/user';
//利用axios.create方法创建一个axios实例:可以设置基础路径、超时的时间的设置
const request = axios.create({
    baseURL: "/",//请求的基础路径的设置
    timeout: 5000//超时的时间的设置,超出五秒请求就是失败的
});

//请求拦截器
request.interceptors.request.use((config) => {
    //获取用户仓库
    const token = localStorage.getItem('token') || "";
    config.headers.authorization = `Bearer ${token}`;
    // config: 请求拦截器回调注入的对象(配置对象), 配置对象的身上最终要的一件事情headers属性
    // 可以通过请求头携带公共参数 - token
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    const [messageApi, contextHolder] = message.useMessage();
    //处理http网络错误
    let status = error.response.status;
    switch (status) {
        case 404:
            //错误提示信息
            messageApi.open({
                type: 'error',
                content: '请求失败路径出现问题'
            });
            break;
        case 500 | 501 | 502 | 503 | 504 | 505:
            messageApi.open({
                type: 'error',
                content: '服务器出错'
            });
            break;
        case 401:
            messageApi.open({
                type: 'error',
                content: '参数有误'
            });
            break;
    }
    return Promise.reject(new Error(error.message))
});
//务必对外暴露axios
export default request;


