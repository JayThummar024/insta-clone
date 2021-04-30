import React from "react";

function Home() {
  return (
    <>
      <div className="home-container">
        <div className="post">
          <h2 className="post-username">Jay Thummar</h2>
          <img
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="my-pic"
          />
          <p className="title">This is title</p>
          <p className="body">This is body</p>
        </div>
      </div>
    </>
  );
}

export default Home;
