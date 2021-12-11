import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentDetails from "./CommentDetails";
import { Comment } from 'semantic-ui-react'
import {
  getComments,
  addComment as addCommentApi,
  editComment as editCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

const CommentsList = ({ commentsUrl, currentUserId, postId }) => {
  const [fetchedComments, setFetchedComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = fetchedComments.filter(
    (fetchedComment) => fetchedComment.parentId === null
  );
  const getReplies = (commentId) =>
    fetchedComments
      .filter((fetchedComment) => fetchedComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId) => {
    addCommentApi(text, parentId).then((comment) => {
      setFetchedComments([comment, ...fetchedComments]);
      setActiveComment(null);
    });
  };

  const editComment = (text, commentId) => {
    editCommentApi(text).then(() => {
      const updatedFetchedComments = fetchedComments.map((fetchedComment) => {
        if (fetchedComment.id === commentId) {
          return { ...fetchedComment, body: text };
        }
        return fetchedComment;
      });
      setFetchedComments(updatedFetchedComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete comment?")) {
      deleteCommentApi().then(() => {
        const updatedFetchedComments = fetchedComments.filter(
          (fetchedComment) => fetchedComment.id !== commentId
        );
        setFetchedComments(updatedFetchedComments);
      });
    }
  };

  useEffect(() => {
    getComments().then((data) => {
      setFetchedComments(data);
    });
  }, []);

  return (
    <>
      <h3>Comments</h3>
      <div>Add comment</div>
      <CommentForm submitLabel="Add" handleSubmit={addComment} />
      <Comment.Group>
        {rootComments.map((rootComment) => (
          <CommentDetails
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={editComment}
            currentUserId={currentUserId}
          />
        ))}
      </Comment.Group>
    </>
  );
};

export default CommentsList;
