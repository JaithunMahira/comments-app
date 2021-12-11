import CommentForm from "./CommentForm";
import { Comment } from 'semantic-ui-react'

const CommentDetails = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";

  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";

  const canDelete =
    currentUserId === comment.userId && replies.length === 0;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <Comment>
      <Comment.Avatar src="/user-icon.png" />
      <Comment.Content >
        <Comment.Author as='a'>{comment.username}</Comment.Author>
        <Comment.Metadata>{createdAt}</Comment.Metadata>
        {!isEditing && <Comment.Text>{comment.body}</Comment.Text>}
        {
          isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )
        }
        <Comment.Actions>
          {canReply && (
            <Comment.Action onClick={() =>
              setActiveComment({ id: comment.id, type: "replying" })
            }>
              Reply
            </Comment.Action>
          )}
          {canEdit && (
            <Comment.Action onClick={() =>
              setActiveComment({ id: comment.id, type: "editing" })
            }>
              Edit
            </Comment.Action>
          )}
          {canDelete && (
            <Comment.Action onClick={() =>
              deleteComment(comment.id)
            }>
              Delete
            </Comment.Action>
          )}
          {
            isReplying && (
              <CommentForm
                submitLabel="Reply"
                handleSubmit={(text) => addComment(text, replyId)}
              />
            )
          }
        </Comment.Actions>
      </Comment.Content>
      {
        replies.length > 0 && (
          <Comment.Group>
            {replies.map((reply) => (
              <CommentDetails
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </Comment.Group>
        )
      }
    </Comment>
  );
};

export default CommentDetails;
