import React, { useContext } from 'react'
import "./topbar.css"
import {Search, Person, Chat, Notifications} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {

  const {user} = useContext(AuthContext);

  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <div className="span logo">Psocial</div>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search />
          <input type="text" className="searchInput" placeholder='Search for friend, post'/>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user?.username}`}>
            <img src={user?.img} alt= "Profile" className='topbarImg'/>
          </Link>
      </div>
    </div>
  )
}
