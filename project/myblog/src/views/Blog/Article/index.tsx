import SearchblogList from '@/components/SearchblogList/index'
import { Typography } from 'antd';

const { Title } = Typography;
export default function index() {

    return (
        <div style={{ minHeight: 600 }}>
            <Title level={2}>Title</Title>
            <SearchblogList />
        </div>

    )
}
