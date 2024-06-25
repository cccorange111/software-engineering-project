
import { Avatar, Card } from 'antd';
import styles from './Info.module.scss'
export default function index() {
    return (
        <div className={styles.content} style={{ minHeight: 600 }} >
            <div className={styles.Avatar}>
                <Avatar size={120} src="https://img.zcool.cn/community/018a5d5708c4c932f875a944db97ed.jpg@3000w_1l_0o_100sh.jpg" alt="头像" />
            </div>
            <div className={styles.card}>
                <Card style={{ width: 600, minHeight: 400 }} hoverable >
                    <div className={styles.word}>
                        <span>谁终将声震人间，必长久深自缄默；</span>
                        <span>谁终将点燃闪电，必长久如云漂泊。</span>
                    </div>
                </Card>
            </div>
        </div>
    )
}
