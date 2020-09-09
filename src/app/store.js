import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import tweetReducer from "../features/tweet/tweetSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    tweet: tweetReducer,
  },
});
