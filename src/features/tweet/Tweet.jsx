import React from "react";

function Tweet({ tweet }) {
  return (
    <>
      <dt>
        <strong>@{tweet.author.username}</strong>
      </dt>
      <dd>{tweet.text}</dd>
      <hr />
    </>
  );
}

export default Tweet;
