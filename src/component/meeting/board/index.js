import ArticleList from "./ArticleList";
import styles from "assets/css/component/meeting/Board.module.css";

function Board({ title }) {
  return (
    <div className={styles.Board}>
      <h2>{title}</h2>
      <ArticleList title={title} />
    </div>
  );
}

export default Board;
