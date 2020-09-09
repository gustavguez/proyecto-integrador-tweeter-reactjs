import React from "react";
import Tweet from "./Tweet";

function TweetList({ tweets }) {
  return (
    <dl>
      {tweets.map((tweet) => (
        <Tweet key={tweet._id} tweet={tweet} />
      ))}
    </dl>
  );
}

export default TweetList;
