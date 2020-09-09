import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import TweetList from "./TweetList";
import TweetsLoading from "./TweetsLoading";
import { fetchTweets } from "./tweetSlice";

function Tweets() {
  const tweets = useSelector((state) => state.tweet.tweets);
  const loading = useSelector((state) => state.tweet.fetchingTweets);
  const error = useSelector((state) => state.tweet.fetchingTweetsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);
  return (
    <div>
      <Link to="/new-tweet">New Tweet</Link>
      {loading ? <TweetsLoading /> : <TweetList tweets={tweets} />}

      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}
    </div>
  );
}

export default Tweets;
