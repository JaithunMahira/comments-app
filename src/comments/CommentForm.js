import { useState } from "react";
import { Button, TextArea, Form } from "semantic-ui-react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {

  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        placeholder='Add your comments here'
        className="comment-form-textarea"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button disabled={isTextareaDisabled} primary >
        {submitLabel}
      </Button>
      {
        hasCancelButton && (
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        )
      }
    </Form>
  );
};

export default CommentForm;
