import { useEffect, useState, useCallback } from "react";
import styles from "./Comments.module.scss";
import styleAni from "./AnimatePublic.module.scss";
import { reqGetBlogComments } from "@/api/index";
export default function Comments({
  id,
  isCommentChange,
  setIsCommentChange,
}) {
  const [comments, setComments] = useState(null);
  //查询这个id关联的所有评论
  const fetchData = useCallback(async (signal) => {
    const res = await reqGetBlogComments(id);
    setComments(res.rows);
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchData(signal).catch((err) => {
      if (err.name !== "AbortError") {
        console.error(err);
      } else {
        //console.log("取消请求");
      };
    });
    return () => {
      controller.abort();
      setIsCommentChange(false);
    };
  }, [id, isCommentChange, setIsCommentChange, fetchData]);

  return comments !== null ? (
    <div className={styles["comments-box"]}>
      <h3 className={styles["comment-label"]}>{`评论 : `}</h3>
      {comments
        ?.sort((a, b) => new Date(b.create_time) - new Date(a.create_time))
        .map((c) => {
          const commentCreatedDate = new Date(c.create_time);
          const formatCreated = `${commentCreatedDate.getFullYear()}年${commentCreatedDate.getMonth() + 1
            }月${commentCreatedDate.getDate()}日`;
          return (
            <div
              className={`${styles["comment-wrap"]} ${styleAni["fade-in-top"]}`}
              key={c.id}
            >
              <div className={styles["comment-user"]}>{c.user}</div>
              <time className={styles["comment-date"]}>{formatCreated}</time>
              <div className={styles["comment"]}>{c.value}</div>
            </div>
          );
        })}
    </div>
  ) : (
    <p>loading</p>
  );
}
