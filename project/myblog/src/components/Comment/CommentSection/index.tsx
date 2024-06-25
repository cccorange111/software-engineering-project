import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { useState } from "react";

export default function CommentSection({ id }) {
    //传入文章的id
    const [isCommentChange, setIsCommentChange] = useState(false);
    return (
        <>
            <CommentForm id={id} setIsCommentChange={setIsCommentChange} />
            <Comments
                id={id}
                isCommentChange={isCommentChange}
                setIsCommentChange={setIsCommentChange}
            />
        </>
    );
}
