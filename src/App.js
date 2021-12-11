import React from "react";
import Post from "./post/Post";
import {
  SAMPLE_TEXT
} from "./post/sampletext";

const App = () => {
  return (
    <React.Fragment>
      <Post postId="1" postHeader="Post 1" text={SAMPLE_TEXT} />
      <Post postId="2" postHeader="Post 2" text={SAMPLE_TEXT} />
    </React.Fragment>
  );
};

export default App;
