import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/actions";

function Profile() {
  const [myposts, setMyposts] = useState([]);
  const [image, setImage] = useState("");
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch()

  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyposts(result.myposts);
        // console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "jay-cloud024");

      fetch("https://api.cloudinary.com/v1_1/jay-cloud024/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          // console.log(result.url)
          fetch("http://localhost:5000/updatedp", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              profilePic: result.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              dispatch(update(result))
              localStorage.setItem("user" , JSON.stringify(result))
              window.location.reload()
            });
        })
        .catch((err) => console.log(err));
    }
  }, [image , dispatch]);

  const updatePic = (file) => {
    setImage(file);
  };

  return (
    <div className="profile-container">
      <div className="bio">
        <div className="profile-pic">
          <img src={user.profilePic} alt="my-pic" />
        </div>
        <div className="profile-info">
          <h2 className="username">{user.name}</h2>
          <div className="reach">
            <p>{myposts.length} Posts</p>
            <p>{user.followers.length} Followers</p>
            <p>{user.following.length} Following</p>
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input
                type="file"
                onChange={(e) => updatePic(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Change profile photo"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="posts">
        {myposts.map((item) => {
          return <img key={item._id} src={item.pic} alt="my-post" />;
        })}
      </div>
    </div>
  );
}

export default Profile;
