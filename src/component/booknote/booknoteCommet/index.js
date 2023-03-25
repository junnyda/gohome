import { useEffect, useState } from "react";
import { createComment, deleteComment, getComments, updateComment } from "api";
import CommentList from "./BCommentList";
import CommentForm from "./CommentForm";

function Comment() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const newestClick = () => setOrder("createdAt");
  const bestClick = () => setOrder("rating");

  const commentDelete = async (id) => {
    const result = await deleteComment(id);
    if (!result) return;
    setItems((prevComment) => prevComment.filter((item) => item.id !== id));
  };

  // options getComments에 전달할 파라미터(정렬)
  const commentLoad = async (options) => {
    let result;
    try {
      setLoadingError(null);
      result = await getComments(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
    }
    const { reviews } = result;
    setItems(reviews);
  };

  const createCommetSuccess = (comment) => {
    setItems((prevComment) => [comment, ...prevComment]);
  };

  const updateCommetSuccess = (comment) => {
    setItems((prevComment) => {
      const splitIdx = prevComment.findIndex((item) => item.id === comment.id);
      return [
        ...prevComment.splice(0, splitIdx),
        comment,
        ...prevComment.splice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    commentLoad(order);
  }, []);

  return (
    <div>
      <div>
        <button onClick={newestClick}>최신순</button>
        <button onClick={bestClick}>베스트순</button>
      </div>
      <CommentForm
        onSubmit={createComment}
        onSubmitSuccess={createCommetSuccess}
      />
      <CommentList
        items={sortedItems}
        onDelete={commentDelete}
        onUpdate={updateComment}
        onUpdateSuccess={updateCommetSuccess}
      />
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default Comment;
