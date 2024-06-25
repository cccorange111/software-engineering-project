import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

function RichTextEditor({ modelValue = "", onGetcontent }) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法

    // 编辑器内容
    const [html, setHtml] = useState('<p></p>')
    let initFinished = false;
    useEffect(() => {
        //此处直接设置会有bug，需要加一个定时器延迟很短的一个时间。可能是组件库的原因
        setTimeout(() => {
            //此处设置成Props中的值
            setHtml(modelValue);
            initFinished = true;
        }, 10);
    }, [modelValue])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: ["uploadVideo"]
    }

    let server_url = 'http://localhost:8080';
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    }
    editorConfig.MENU_CONF = {};
    editorConfig.MENU_CONF["uploadImage"] = {
        //小图片就不需要上传了，直接插入文本
        base64LimitSize: 10 * 1024, // 10kb
        //必须是完整的服务端地址
        server: server_url + "/upload/file",
    };
    editorConfig.MENU_CONF["insertImage"] = {
        parseImageSrc: (src) => {
            if (src.indexOf("http") !== 0) {
                return `${server_url}${src}`;
            }
            return src;
        },
    };
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [])

    const handleChange = (editor) => {
        setHtml(editor.getHtml());
        //setHtml是异步的。console.log("html", html);还是初始的
        if (initFinished) {
            onGetcontent(editor.getHtml());
        }
    }
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => handleChange(editor)}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default RichTextEditor;
