import React from 'react'
import ReactDOM from 'react-dom/client'
//样式初始化一般放在最前面，这样自己写的样式可以覆盖掉初始样式
import "reset-css"
//UI框架的样式

//全局样式
import "@/assets/global.scss"
//组件的样式
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
// 状态管理
import { Provider } from "react-redux"
import store from "@/store"


ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      < BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)