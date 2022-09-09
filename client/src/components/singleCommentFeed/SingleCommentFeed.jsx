import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "./singleCommentFeed.css";
import { BASE_URL } from "../../baseUrl";
import SingleComment from "../singleComment/SingleComment";

const SingleCommentFeed = () => {
  const [comment, setComment] = useState(null);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  //get comment
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/comments/find/${params.id}`);
        setComment(res.data);
      } catch (err) {
        console.log(err);
      };
    };
    getComment();
  }, [params]);

  return (
    <div className="singleCommentFeed">
      <SingleComment
        comment={comment}
        currentUser={currentUser}
      />
    </div>
  )
}

export default SingleCommentFeed