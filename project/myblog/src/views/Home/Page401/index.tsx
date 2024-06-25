import { DeleteFilled } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Checkbox,
    //Comment,
    Divider,
    Empty, message as antMessage, Modal,
    Pagination,
    Select
} from "antd";
import CommentBox from "@/components/Comment/CommentBox.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//next.js用于媒体查询的Hook
import { useMediaQuery } from "react-responsive";
import style from "./PostComments.module.scss";
//评论的部分
import {
    deleteComment, getComments, reset, resetIsError
} from "@/store/Comments/commentSlice";
//获取之前的值
import usePrevious from "@/hooks/usePrevious";
//显示loading状态的组件
import HCenterSpin from "@/components/HCenterSpin/HCenterSpin.tsx";

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

function PostComments() {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

    const defaultPageSize = 10;
    //选择的列表
    const [checkedList, setCheckedList] = useState([]);
    //用于判断全选按钮的样式 选一个时和全选的样式不一样
    const [indeterminate, setIndeterminate] = useState(false);
    //是否全选
    const [checkAll, setCheckAll] = useState(false);
    //const [selectedValue, setSelectedValue] = useState("allPosts");
    const dispatch = useDispatch();
    const { comments, isSuccess, isError, isLoadEnd, message } = useSelector(
        (store) => store.Comment
    );

    //获取评论
    //组件销毁时把文章清空
    useEffect(() => {
        dispatch(getComments());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const preMessage = usePrevious(message);
    useEffect(() => {
        //同一个错误不再提示
        if (isError && preMessage !== message) {
            antMessage.error(message);
        }
        return () => {
            dispatch(resetIsError());
        }
    }, [isError, message, dispatch, preMessage]);
    //操作完回归初始状态
    useEffect(() => {
        if (
            isSuccess &&
            (message === "评论已发布" ||
                message === "已取消发布评论" ||
                message === "成功删除评论")
        ) {
            antMessage.success(message);
            dispatch(getComments());
            setCheckedList([]);
            setIndeterminate(false);
            //setSelectedValue("allPosts");
        }
    }, [isSuccess, message, dispatch]);

    const allComments = useMemo(
        () =>
            comments
                .map((c) => {
                    return {
                        id: c.id,
                        source: c.title,
                        author: c.user,
                        commentContent: c.value,
                        time: new Date(c.create_time),
                    };
                })
                .sort((a, b) => b.time - a.time),
        [comments]
    );

    //当前的个数
    const [currentPageComments, setCurrentPageComments] = useState([]);
    const [paginationTotal, setPaginationTotal] = useState(0);
    let selectedComments = useRef();

    useEffect(() => {
        setCurrentPageComments(allComments.slice(0, defaultPageSize));
        setPaginationTotal(allComments.length);
        selectedComments.current = allComments;
    }, [allComments]);

    const currentPageCmId = useMemo(
        () => currentPageComments.map((item) => item.id),
        [currentPageComments]
    );
    //普通单选框
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(list.length && list.length < currentPageComments.length);
        setCheckAll(list.length === currentPageComments.length);
    };
    //全选框的回调函数
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? currentPageCmId : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    //分页器
    const onChangePage = (page, pageSize) => {
        const start = (page - 1) * defaultPageSize;
        const end = start + pageSize;
        setCurrentPageComments(selectedComments.current.slice(start, end));
        setCheckedList([]);
        setIndeterminate(false);
        setCheckAll(false);
    };


    const [modalText, setModalText] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);

    const commentsId = useRef([]);
    const handleOk = () => {
        setIsModalVisible(false);
        commentsId.current.forEach((commentId) => {
            dispatch(deleteComment(commentId));
        });
    };

    const handleCancel = () => {
        commentsId.current = [];
        setIsModalVisible(false);
    };

    const deleteSelectedCms = () => {
        setModalText(`确认删除所选评论(共${checkedList.length}条)?`);
        setIsModalVisible(true);
        commentsId.current = checkedList;
    };

    const handleDeleteComment = ({ cId }) => {
        setModalText(`确认删除评论?`);
        setIsModalVisible(true);
        commentsId.current = [cId];
    };

    //isLoadEnd为true时,currentPageComments数据未得到,需等待下一次渲染.
    const preIsLoadEnd = usePrevious(isLoadEnd);

    return preIsLoadEnd && isLoadEnd ? (
        <>
            <div className={style["post-comments-box"]}>
                <div className={style["comments-header"]}>
                    {/* {isTabletOrMobile ? renderPostSelect : null} */}
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                        className={style["checkbox"]}
                    >
                        全选
                    </Checkbox>
                    {isTabletOrMobile ? (
                        <button
                            className={style["delete-selected-icon-button"]}
                            disabled={checkedList.length === 0}
                            onClick={deleteSelectedCms}
                        >
                            <DeleteFilled />
                        </button>
                    ) : (
                        <Button
                            danger
                            type="primary"
                            disabled={checkedList.length === 0}
                            onClick={deleteSelectedCms}
                        >
                            删除所选评论
                        </Button>
                    )}

                    <span className={style["tip-text"]}>
                        {checkedList.length > 0
                            ? ` 已选中${checkedList.length}条评论`
                            : null}
                    </span>
                    {isTabletOrMobile && null}
                </div>
                <Divider />
                <CheckboxGroup
                    className={style["checkbox-group"]}
                    value={checkedList}
                    onChange={onChange}
                >
                    {currentPageComments.length > 0 ? (
                        currentPageComments.map((comment, i) => {
                            return (
                                <div key={comment.id}>
                                    <div className={style["comment-wrap"]}>
                                        <Checkbox className={style["checkbox"]} value={comment.id}>
                                            <CommentBox
                                                className={style["comment-box"]}
                                                author={comment.author}
                                                avatar={
                                                    <Avatar
                                                        style={{
                                                            color: "#457fca",
                                                            backgroundColor: "#d7e9ff",
                                                        }}
                                                        alt={comment.author}
                                                    >
                                                        {comment.author.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                }
                                                content={<p>{comment.commentContent}</p>}
                                                datetime={<span>{comment.time.toLocaleString()}</span>}
                                            ></CommentBox>
                                        </Checkbox>
                                        {isTabletOrMobile ? (
                                            <button
                                                onClick={(e) => {
                                                    handleDeleteComment({ cId: comment.id }, e);
                                                }}
                                                className={style["delete-comment-button-mobile"]}
                                            >
                                                删除评论
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) => {
                                                    handleDeleteComment({ cId: comment.id }, e);
                                                }}
                                                className={style["delete-comment-button"]}
                                            >
                                                删除评论
                                            </button>
                                        )}

                                        <span className={style["source-right"]}>
                                            所在文章: {comment.source}
                                        </span>
                                    </div>
                                    <Divider className={style["divider"]} />
                                </div>
                            );
                        })
                    ) : (
                        <Empty />
                    )}
                </CheckboxGroup>
                {paginationTotal > defaultPageSize ? (
                    <Pagination
                        className={style["pagination"]}
                        total={paginationTotal}
                        onChange={onChangePage}
                        showSizeChanger={false}
                        pageSize={defaultPageSize}
                    ></Pagination>
                ) : null}
            </div>
            <Modal
                title="删除评论"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <p>{modalText}</p>
            </Modal>
        </>
    ) : (
        <HCenterSpin />
    );
}

export default PostComments;
