import { useEffect, useState } from "react";
import styles from "./CommentForm.module.scss";
import { Divider } from "antd";
import { reqAddComment } from '@/api/index'
export default function CommentForm({ id, setIsCommentChange }) {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showNotice, setShowNotice] = useState(false);
  const form = {
    id,
    username,
    comment,
  };
  const postData = async () => {
    let body = {
      article_id: form.id,
      user: form.username,
      value: form.comment
    }
    console.log("body", body);
    const response = await reqAddComment(body);
    console.log(response)
    if (response.code >= 400 && response.code < 600) {
      //console.error("error: ", error.message);
      setMessage("发送失败");
      setShowNotice(true);
    }
    if (response.code == 200) {
      setMessage("评论已发送");
      setShowNotice(true);
      setIsCommentChange(true);
    }
    setComment("");
    setUsername("");
    setEmail("");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  useEffect(() => {
    if (showNotice) {
      setTimeout(() => {
        setShowNotice(false);
      }, 3000);
    }
  }, [showNotice]);

  return (
    <>
      <div className={styles["comment-form-box"]}>
        <form onSubmit={onSubmit}>
          <textarea
            className={styles["comment-textarea"]}
            required
            name="comment"
            maxLength={1000}
            placeholder="评论"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input type="hidden" name="id" value={id} />
          <div className={styles["user-info-wrap"]}>
            <input
              className={styles["username-input"]}
              required
              type="text"
              name="username"
              maxLength={100}
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <input
              className={styles["email-input"]}
              required
              type="email"
              name="email"
              placeholder="邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
          </div>
          <input
            className={styles["submit-button"]}
            type="submit"
            value="发送评论"
          />
        </form>
        {showNotice ? (
          <div className={styles["notification"]}>{message}</div>
        ) : null}
      </div>

    </>


  );
}
