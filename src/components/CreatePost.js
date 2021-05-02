import React from "react";

function CreatePost() {
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
          />
          <input
            placeholder="body"
            type="text"
            className="validate"
            name="body"
          />
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="add image"/>
              </div>
            </div>
        

          <button type="submit" className="waves-effect waves-light btn my-btn">Upload</button>
        </div>
      </div>
      f
    </>
  );
}

export default CreatePost;
