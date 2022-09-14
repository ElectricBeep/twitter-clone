import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from "../../components/sidebar/Sidebar";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import "./singlePost.css";
import Comments from '../../components/comments/Comments';
import { fetchFailure, fetchStart, fetchSuccess } from '../../redux/postReducer';
import { BASE_URL } from '../../baseUrl';
import SinglePagePost from '../../components/singlePagePost/SinglePagePost';
import CommentInput from '../../components/commentInput/CommentInput';

const SinglePost = () => {
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [postCreator, setPostCreator] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  //get single post
  useEffect(() => {
    const getPost = async () => {
      dispatch(fetchStart());
      try {
        const res = await axios.get(`${BASE_URL}/posts/find/${params.id}`);
        dispatch(fetchSuccess(res.data));
      } catch (err) {
        dispatch(fetchFailure());
      };
    };
    getPost();
  }, [dispatch, params]);

  const { currentPost } = useSelector((state) => state.post);

  //get post creator
  useEffect(() => {
    if (currentPost) {
      const getPostCreator = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/users/${currentPost.userId}`);
          setPostCreator(res.data);
        } catch (err) {
          console.log(err);
        };
      };
      getPostCreator();
    };
  }, [currentPost]);


  return (
    <div className="home">
      <Sidebar />
      <div className="singlePostPost">
        <div className="singlePostBack">
          <Link to="/" className="link">
            <BsArrowLeft className="singlePostBackIcon" />
          </Link>
          <p>Thread</p>
        </div>
        <div className="singlePostContent">
          <SinglePagePost currentPost={currentPost} currentUser={currentUser} postCreator={postCreator} />
        </div>
        <CommentInput
          isCommenting={isCommenting}
          setIsCommenting={setIsCommenting}
          postCreator={postCreator}
          currentPost={currentPost}
          currentUser={currentUser}
          setComments={setComments}
        />
        <div className="singlePostCommentsContainer">
          <Comments
            currentPost={currentPost}
            setComments={setComments}
            comments={comments}
          />
        </div>
      </div>
      <Rightbar page="home" />
    </div>
  )
}

export default SinglePost