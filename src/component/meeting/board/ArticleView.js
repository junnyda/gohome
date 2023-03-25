import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from 'layout/Layout';
import parse from 'html-react-parser';
import { getFAQArticleById, deleteFAQArticleById } from 'api';
import Comment from 'component/comment';
import { Container } from 'react-bootstrap';
import profile from 'assets/images/profile.png';
import styles from 'assets/css/component/meeting/Board.module.css';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function ArticleView() {
  const [data, setData] = useState({});
  const { no, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const articleLoad = async (no, id) => {
      const FAQArticle = await getFAQArticleById(no, id);
      setData(FAQArticle);
    };
    articleLoad(no, id);
  }, [id]);

  const onDelete = async (no, id) => {
    await deleteFAQArticleById(no, id);
    navigate(-1);
    return;
  };

  return (
    <div>
      <Layout>
        <Container>
          {data && data.creator ? (
            <div className={styles.ArticleContentBox}>
              <div className={styles.article_header}>
                <div className={styles.ArticleTitle}>
                  <h3>{data.title}</h3>
                </div>
                <div className={styles.WriterInfo}>
                  <div className={styles.Writer_profile_img}>
                    <img src={profile}></img>
                  </div>
                  <div className={styles.article_writer}>
                    <div>{data?.creator?.name}</div>
                  </div>
                  <div className={styles.article_info}>
                    <div>{formatDate(data.createdAt)}</div>
                  </div>
                  <div className={styles.article_hit}>
                    <div>{data.hitCount}</div>
                  </div>
                </div>
              </div>
              <div className={styles.article_body}>
                <div>내용: {data.content}</div>
                <div>
                  hashTag:
                  {data.hashtags.map((hashtag, idx) => {
                    return (
                      <p className={styles.hashTag} key={idx}>
                        {hashtag}
                      </p>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  onDelete(no, id);
                }}
              >
                삭제
              </button>
              <Link to={`../info/${no}/modi/${id}`}>
                <button>수정</button>
              </Link>
              <Link to={`../info/${no}`}>
                <button>목록으로</button>
              </Link>
              <div className={styles.CommentBox}>
                <Comment />
              </div>
            </div>
          ) : (
            '글이 없음'
          )}
        </Container>
      </Layout>
    </div>
  );
}

export default ArticleView;
