import React, { useEffect, useState } from "react";
// import {useSelector,useDispatch} from "react-redux"
// import * as action from "../redux/actions"

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
        console.log(result.posts);
      });
  }, []);

  return (
    <>
      <div className="home-container">
        {posts.map((item) => {
          return (
            <div className="post" key={item._id}>
              <h2 className="post-username">{item.postedBy.name}</h2>
              <img
                src={item.pic}
                alt="my-pic"
              />
              <p className="title">{item.title}</p>
              <p className="body">{item.body}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
