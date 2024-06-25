import React, { useEffect, useState } from 'react';
import { MdEditor, MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { reqUploadImg } from '@/api/index'
export default ({ modelValue = "", onGetcontent = "" }) => {
    const [id] = useState('key');
    const [scrollElement] = useState(document.documentElement);
    const [text, setText] = useState("");
    useEffect(() => {
        //此处直接设置会有bug，需要加一个定时器延迟很短的一个时间。可能是组件库的原因
        setTimeout(() => {
            //此处设置成Props中的值
            console.log(modelValue);
            setText(modelValue);
        });
    }, [modelValue])
    const handleChange = (text) => {
        setText(text);
        //console.log(text);
        onGetcontent(text);
    }
    const onUploadImg = async (files, callback) => {
        const res = await Promise.all(
            files.map((file) => {
                return new Promise((rev, rej) => {
                    const form = new FormData();
                    form.append('file', file);
                    console.log("fiel", form.get('file'));
                    reqUploadImg(form)
                        .then((res) => rev(res))
                        .catch((error) => rej(error));
                });
            })
        );

        callback(res.map((item) => {
            return 'http://localhost:8080/' + item.data.url.replace(/\\/g, "/");
        }));
    }
    return (
        <>
            <MdEditor modelValue={text} onChange={handleChange} onUploadImg={onUploadImg} />
            <MdPreview editorId={id} modelValue={text} />
        </>
    )

};