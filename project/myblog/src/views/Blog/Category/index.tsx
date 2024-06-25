import { message, Radio, Tabs } from 'antd';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '@/store/Category/CategorySlice'
import SearchblogList from '@/components/SearchblogList/index'
export default function index() {
    const { category, isError } = useSelector((state: any) => state.Category);
    const [categoryList, setcategoryList] = useState<any>([]);
    const dispatch = useDispatch();

    const loadDatas = async () => {
        dispatch(getCategory());
        if (isError) {
            message.error("请求失败");
        }
    };
    useEffect(() => {
        loadDatas();
    }, []);
    useEffect(() => {
        let result = category.map((value: any) => (
            {
                key: value.id,
                name: value.name
            }
        ))
        setcategoryList(result);
    }, [category])
    return (
        <>

            <div>

                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    style={{ minHeight: 600 }}
                    items={categoryList.map((catergoty: { name: any; key: string | undefined; }) => {
                        return {
                            label: catergoty.name,
                            key: catergoty.key,
                            children: <SearchblogList categoryId={catergoty.key} />,
                        };
                    })}
                />
            </div>
        </>
    )
}
