import { useState } from "react";
import "../../assets/css/component/comment/Comment.css";
import CommentForm from "./CommentForm";

const styles = {
  wrapper: {
    margin: 8,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    border: "1px solid grey",
    borderRadius: 16,
  },
  imageContainer: {},
  image: {
    width: 130,
    borderRadius: 25,
  },
  contextContainer: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  nameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentTest: {
    color: "black",
    fontSize: 16,
  },
  button: {
    float: "left",
  },
};

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function CommentListItem({ item, onDelete, onEdit }) {
  const deleteCommentClick = () => onDelete(item.id);
  const editCommentClick = () => onEdit(item.id);

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img src={item.imgUrl} style={styles.image} alt={item.title} />
      </div>
      <div style={styles.contextContainer}>
        <div>{/* <h4>{item.title}</h4> */}</div>
        <div>{item.content}</div>
        {/* <div>{item.rating}</div> */}
        <div>{formatDate(item.createdAt)}</div>
      </div>
      <div>
        <button onClick={deleteCommentClick}>삭제</button>
        <button onClick={editCommentClick}>수정</button>
      </div>
    </div>
  );
}

function CommentList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [edittingID, setEdittingID] = useState(null);

  const commentCancel = () => setEdittingID(null);

  return (
    <div>
      <ul>
        {items.map((item) => {
          if (item.id === edittingID) {
            const { id, content } = item;
            const initialValues = { content };

            const commentSubmit = (formatDate) => onUpdate(id, formatDate);

            const commentSubmitSuccess = (comment) => {
              onUpdateSuccess(comment);
              setEdittingID(null);
            };
            return (
              <div key={item.id}>
                <CommentForm
                  initialValues={initialValues}
                  onCancel={commentCancel}
                  onSubmit={commentSubmit}
                  onSubmitSuccess={commentSubmitSuccess}
                />
              </div>
            );
          }
          return (
            <div key={item.id}>
              <CommentListItem
                item={item}
                onDelete={onDelete}
                onEdit={setEdittingID}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentList;
