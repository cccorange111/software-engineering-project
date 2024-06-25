import { useState, useEffect } from 'react';
import { reqBlog } from '@/api/index'
import styles from './detal.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Card } from 'antd';
import { MdEditor, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import Comment from '@/components/Comment/CommentSection/index.tsx'
const { Title } = Typography;

export default function index({ categoryId = "" }) {

    const [article, setarticle] = useState({
        category_id: '',
        content: '',
        create_time: '',
        id: '',
        title: ''
    });
    const location = useLocation();
    const navigate = useNavigate();
    const getContent = async () => {
        //获取search参数
        let params = new URLSearchParams(location.search);
        let id = params.get('id');
        //setid(id);
        let res = await reqBlog(id);
        console.log(res);
        if (res.code == 200) {
            setarticle({ ...res.rows[0] });
        }

    }
    useEffect(() => {
        getContent();
    }, []);
    return (
        <div className={styles.content}>
            <Card className={styles.card}>
                <Title>{article.title}</Title>
                <div>
                    <MdPreview editorId={"key" + article.id} modelValue={article.content} />
                </div>

                <Comment id={article.id} />
            </Card>
        </div>
    )
}

