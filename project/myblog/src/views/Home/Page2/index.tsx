import { Button, Space, Table, message, Popconfirm, Modal, Input } from 'antd';
import React from 'react';
import type { TableProps } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { getCategory, updateCategory, addCategory as _addCategory, deleteCategory } from '@/store/Category/CategorySlice'

interface DataType {
    name: string;
    key: string;
}
export default function index() {

    const { category, isError, isSuccess, message: msg } = useSelector((state) => state.Category);
    //添加
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    //修改
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryList, setcategoryList] = useState([]);
    const [addCategory, setaddCategory] = useState({
        name: "",
    });
    const [updateACategory, setupdateACategory] = useState({
        id: "",
        name: "",
    });
    const dispatch = useDispatch();

    //console.log(1232, category);
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <a onClick={() => showModal(record.key)}>修改</a>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={(e) => confirm(e, text, record, index)}
                        onCancel={(e) => cancel(e, text, record, index)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a>删除</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    const loadDatas = async () => {
        dispatch(getCategory());
        if (isError) {
            message.error("请求失败");
        }
    };
    useEffect(() => {
        let result = category.map(value => (
            {
                key: value.id,
                name: value.name
            }
        ))
        setcategoryList(result);
    }, [category])
    //确认删除分类
    const confirm = async (e: React.MouseEvent<HTMLElement>, text, record, index) => {
        //console.log(' text, record, index', text, record, index);
        dispatch(deleteCategory(record.key))
        if (isSuccess) {
            loadDatas();
            message.success("删除成功");
        } else {
            message.error("删除失败");
        }

    };
    //取消删除分类
    const cancel = (e: React.MouseEvent<HTMLElement>, text, record, index) => {
        message.error('取消删除');
    };
    //添加的Input的回调
    const handleAddInput = (e: any) => {
        setaddCategory({
            name: e.target.value
        })
    }
    //添加的Modal
    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleAddOk = async () => {
        dispatch(_addCategory(addCategory));
        console.log("addCategory", addCategory.user_id)
        //let result = await reqAddCategory(addCategory);
        if (isSuccess) {
            loadDatas();
            message.success("添加成功");
        } else {
            message.error("添加失败");
        }
        setIsAddModalOpen(false);
    };
    //取消添加
    const handleAddCancel = () => {
        //清空信息
        setaddCategory({
            name: ""
        })
        setIsAddModalOpen(false);
    };
    //更新信息
    const handleChangeInput = (e: any) => {
        //只需更新内容（点击的回调传入id)
        setupdateACategory({
            ...updateACategory,
            name: e.target.value
        })
    }
    //修改的Modal
    const showModal = (id: string) => {
        setIsModalOpen(true);
        console.log("id", id);
        //此处需要传入id，保存到状态中
        setupdateACategory({
            ...updateACategory,
            id
        })
    };
    //更新信息
    const handleOk = async () => {
        console.log("yaoxiugad shuju ", updateACategory);
        dispatch(updateCategory(updateACategory));
        if (isSuccess) {
            loadDatas();
            message.success("更新成功");
        } else {
            message.error("更新失败");
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setupdateACategory({
            id: "",
            name: ""
        })
        setIsModalOpen(false);
    };

    useEffect(() => {
        loadDatas();
    }, []);
    return (
        <div>
            <div className="addCategoty">
                <Button onClick={showAddModal}>添加分类</Button>
                <Table columns={columns} dataSource={categoryList} />
                {/* 添加分类的Modal */}
                <Modal title="添加分类" open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel}>
                    <Input placeholder="请输入分类名称" onChange={handleAddInput} value={addCategory.name} />
                </Modal>
                {/* 修改分类的Modal */}
                <Modal title="修改分类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input placeholder="请输入分类名称" onChange={handleChangeInput} value={updateACategory.name} />
                </Modal>
            </div>
        </div>
    )
}