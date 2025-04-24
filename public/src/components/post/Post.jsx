import "./post.css";
import { useEffect, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";

export default function Post({post}) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user, setUser] = useState({});

  const publicPhoto = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  useEffect( () => {
    const serverRoot = process.env.REACT_APP_SERVER_CONNECT;
    const fetchUserData = async () => {
    const res = await axios.get(serverRoot + `users?userId=${post.userId}`);
    setUser(res.data);
    }
    fetchUserData();
  },[post.userId])   

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src=""
                alt=""
              />
            </Link>
            
            <span className="postUsername">
                {user.username}
            </span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={publicPhoto+post?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={publicPhoto + "like.png"}  onClick={likeHandler} alt="" />
            <img className="likeIcon" src={ publicPhoto + "heart.png"} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}