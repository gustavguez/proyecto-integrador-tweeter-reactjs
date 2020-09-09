import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    sendingTweet: false,
    sendTweetError: null,
    fetchingTweets: false,
    fetchingTweetsError: null,
  },
  reducers: {
    sendTweetStart(state, action) {
      state.sendingTweet = true;
    },
    sendTweetSuccess(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = null;
      state.tweets.push(action.payload);
    },
    sendTweetError(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = action.payload;
    },
    fetchTweetsStart(state, action) {
      state.tweets = [];
      state.fetchingTweetsError = null;
      state.fetchingTweets = true;
    },
    fetchTweetsSuccess(state, action) {
      state.tweets = action.payload;
      state.fetchingTweets = false;
      state.fetchingTweetsError = null;
    },
    fetchTweetsError(state, action) {
      state.fetchingTweets = false;
      state.fetchingTweetsError = action.payload;
    },
  },
});

export const {
  sendTweetError,
  sendTweetStart,
  sendTweetSuccess,
  fetchTweetsStart,
  fetchTweetsSuccess,
  fetchTweetsError,
} = tweetSlice.actions;

export const sendTweet = (text, history) => async (dispatch) => {
  dispatch(sendTweetStart());

  try {
    const response = await api.post("/tweets", { text });
    dispatch(sendTweetSuccess(response.data));
    history.push("/tweets");
  } catch (error) {
    dispatch(sendTweetError(error.message));
  }
};

export const fetchTweets = () => async (dispatch) => {
  dispatch(fetchTweetsStart());

  try {
    const response = await api.get("/tweets");
    dispatch(fetchTweetsSuccess(response.data));
  } catch (error) {
    dispatch(fetchTweetsError(error.message));
  }
};

export default tweetSlice.reducer;
