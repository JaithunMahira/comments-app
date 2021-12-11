import CommentsList from "../comments/CommentsList";
import { Container, Header } from "semantic-ui-react";

const Post = ({ postId, postHeader, text }) => {
  return (
    <Container text>
      <Header as="h1">{postHeader}</Header>
      <p>{text}</p>
      <CommentsList
        commentsUrl="http://localhost:3004/comments"
        currentUserId="1"
        postId={postId}
      />
    </Container>
  );
};

export default Post;
