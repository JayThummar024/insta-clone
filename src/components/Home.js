import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import * as action from "../redux/actions"

function Home() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.userData);
  const [text, setText] = useState("");

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
      });
  }, []);

  const likepost = (id) => {
    fetch("http://localhost:5000/likes", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = posts.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikepost = (id) => {
    fetch("http://localhost:5000/unlikes", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = posts.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = posts.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`http://localhost:5000/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = posts.filter((item) => {
          return item._id !== result._id;
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="home-container">
        {posts.map((item) => {
          return (
            <div className="post" key={item._id}>
              <h2 className="post-username">
                <Link className="profile-navigation"
                  to={
                    item.postedBy._id !== user._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.name}
                </Link>

                {item.postedBy._id === user._id && (
                  <i
                    className="fas fa-trash delete-icon"
                    onClick={() => deletePost(item._id)}
                  />
                )}
              </h2>
              <img src={item.pic} alt="my-pic" />

              {item.likes.includes(user._id) ? (
                <i
                  className="fas fa-heart fa-icon-heart"
                  onClick={() => unlikepost(item._id)}
                >
                  <span className="likes">{item.likes.length} likes</span>
                </i>
              ) : (
                <i
                  className="far fa-heart fa-icon-heart"
                  onClick={() => likepost(item._id)}
                >
                  <span className="likes">{item.likes.length} likes</span>
                </i>
              )}

              <p className="title">{item.title}</p>
              <p className="body">{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <div className="comments-display" key={record._id}>
                    <p className="postedby">{record.postedBy.name}</p>
                    <p className="comment">{record.text}</p>
                  </div>
                );
              })}
              <form
                className="comment-section"
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  setText("");
                }}
              >
                <input
                  type="text"
                  placeholder="add a comment"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <i
                  className="fas fa-plus waves-effect waves-light btn comment-btn"
                  onClick={() => {
                    makeComment(text, item._id);
                    setText("");
                  }}
                />
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
