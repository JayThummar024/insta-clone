import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { update } from "../redux/actions";

function Profile() {
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [myProfile, setMyProfile] = useState({
    user: { name: "loading", followers: [0], following: [0] },
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
        // console.log(result);
        setMyProfile(result);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const followUser = (followId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        dispatch(update(result));
        localStorage.setItem("user", result);
        setMyProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, result._id],
            },
          };
        });
      })
      .catch((err) => console.log(err));
  };
  const unFollowUser = (unfollowId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch(update(result));
        localStorage.setItem("user", result);
        setMyProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== result._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-container">
      <div className="bio">
        <div className="profile-pic">
          <img
            src={myProfile.user.profilePic}
            alt="my-pic"
          />
        </div>
        <div className="profile-info">
          <h2 className="username">{myProfile.user.name}</h2>
          <div className="reach">
            <p>{myProfile.posts.length} Posts</p>
            <p>{myProfile.user.followers.length} Followers</p>
            <p>{myProfile.user.following.length} Following</p>
          </div>

          {myProfile.user.followers.includes(user._id) ? (
            <button
              className="waves-effect waves-light btn follow-btn"
              onClick={() => unFollowUser(myProfile.user._id)}
            >
              unfollow <i className="fas fa-user user-icon" />
            </button>
          ) : (
            <button
              className="waves-effect waves-light btn follow-btn"
              onClick={() => followUser(myProfile.user._id)}
            >
              follow <i className="fas fa-user user-icon" />
            </button>
          )}
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
