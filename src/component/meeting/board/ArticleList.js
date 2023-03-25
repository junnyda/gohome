import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import { getArticle, getFAQArticlesByMeetingNo } from 'api';
import { useEffect, useState } from 'react';
import styles from 'assets/css/component/meeting/Board.module.css';
import { HiPencilSquare } from 'react-icons/hi2';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function ArticleList({ title }) {
  const { no } = useParams();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  const listLoad = async () => {
    if (title === 'FAQ') {
      const FAQArticle = await getFAQArticlesByMeetingNo(no);
      setItems(FAQArticle);
    } else if (title === '모임후기') {
      const FAQArticle = await getFAQArticlesByMeetingNo(no);
      setItems(FAQArticle);
    } else if (title === '모임원 게시판') {
      const FAQArticle = await getFAQArticlesByMeetingNo(no);
      setItems(FAQArticle);
    } else {
      console.log('게시판이 생성되지 않았습니다');
      console.log(title);
      return;
    }
  };

  useEffect(() => {
    listLoad();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Link
              to={`/meeting/${no}/write`}
              className={styles.articleWriteButton}
            >
              <HiPencilSquare size='24' />
            </Link>
          </Col>
          {/* <Col md={2}>
            <form onSubmit={handleSearchSubmit}>
              <input name="search" />
              <button type="submit">검색</button>
            </form>
          </Col> */}
        </Row>
        {items && items.length !== 0 ? (
          <div className={styles.articleList}>
            <Row className={styles.boardHeader}>
              <Col md={1}></Col>
              <Col md={1}>No.</Col>
              <Col md={5}>제목</Col>
              <Col md={1}>작성자</Col>
              <Col md={2}>작성일</Col>
              <Col md={1}>조회수</Col>
            </Row>
            {items.map((item, idx) => (
              <div key={idx}>
                <Row className={styles.articles}>
                  <Col md={1}></Col>
                  <Col md={1}>{item.autoIncrementField}</Col>
                  <Col md={5} className={styles.articlesTitle}>
                    <Link to={`${item._id}`}>{item.title}</Link>
                  </Col>
                  <Col md={1}>{item.creator.name}</Col>
                  <Col md={2}>{formatDate(item.createdAt)}</Col>
                  <Col md={1}>{item.hitCount}</Col>
                </Row>
              </div>
            ))}
            <Row>
              <Col>페이징</Col>
            </Row>
          </div>
        ) : (
          '글이 없습니다. 글을 작성해주세요.'
        )}
      </Container>
    </div>
  );
}

export default ArticleList;
