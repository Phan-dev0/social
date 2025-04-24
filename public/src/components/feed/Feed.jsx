import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect( () => {
    const serverRoot = process.env.REACT_APP_SERVER_CONNECT;
    const fetchPostsData = async () => {
      const res = username? 
      await axios.get(serverRoot + `post/profile/${username}`):
      await axios.get(serverRoot + `post/timeline/${user._id}`)
      setPosts(res.data);
    }
    fetchPostsData();
  },[username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post}/>
        ))}
      </div>
    </div>
  );
}