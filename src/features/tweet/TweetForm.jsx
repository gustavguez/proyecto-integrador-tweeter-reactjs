import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendTweet } from "./tweetSlice";

function TweetForm({ history }) {
  const [text, setText] = useState("");
  const loading = useSelector((state) => state.tweet.sendingTweet);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendTweet(text, history));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>New Tweet</h1>
      <textarea
        placeholder="Say something"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default TweetForm;
