import { useEffect } from "react";
import axios from "axios";

import Comment from "../comment/Comment";
import { BASE_URL } from "../../baseUrl";

const Comments = ({ currentPost, setComments, comments }) => {

  //get post comments
  useEffect(() => {
    if (currentPost) {
      const getComments = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/comments/${currentPost?._id}`);
          setComments(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getComments();
    };
  }, [currentPost, setComments]);

  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment
          setComments={setComments}
          comment={comment}
          key={comment._id}
          currentPost={currentPost}
        />
      ))}
    </div>
  )
}

export default Comments