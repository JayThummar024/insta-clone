import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  //   const [myposts, setMyposts] = useState([]);
  const [myProfile, setMyProfile] = useState({
    user: { name: "loading" },
    posts: [{ _id: "1", pic: "loading" }],
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        setMyProfile(result);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="profile-container">
      <div className="bio">
        <div className="profile-pic">
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="my-pic"
          />
        </div>
        <div className="profile-info">
          <h2 className="username">{myProfile.user.name}</h2>
          <div className="reach">
            <p>{myProfile.posts.length} posts</p>
            <p>0 followers</p>
            <p>0 following</p>
          </div>
        </div>
      </div>
      <br />
      <div className="posts">
        {myProfile.posts.map((item) => {
          return <img key={item._id} src={item.pic} alt="my-post" />;
        })}
      </div>
    </div>
  );
}

export default Profile;
