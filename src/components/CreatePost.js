import React, { useEffect, useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
  }, [url,title,body]);

  function postDetails() {
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
        console.log(result);
        setUrl(result.url);
      })
      .catch((err) => console.log(url));
  }

  return (
    <>
      <div className="card-container">
        <div className="card card-wrapper">
          <h2 className="form-type my-heading">Share your memories!!</h2>
          <input
            placeholder="title"
            type="text"
            className="validate"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="body"
            type="text"
            className="validate"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="add image"
                value={image}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <button
            type="submit"
            className="waves-effect waves-light btn my-btn"
            onClick={postDetails}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
