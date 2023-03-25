import { insertFAQArticle } from 'api';
import Layout from 'layout/Layout';
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { auth } from 'actions/user_action';
import { useDispatch } from 'react-redux';
import Editor from './Editor';
import styles from 'assets/css/component/meeting/Board.module.css';

const INITIAL_VALUES = {
  title: '',
  content: '',
  writer: '',
  createAt: null,
  hashtags: [],
};

function ArticleWrite() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [authUser, setAuthUser] = useState({});

  const handleChange = (name, value) => {
    if (name === 'hashtags') {
      const hashtags = value.split(','); // 입력된 값을 쉼표로 분리하여 배열로 변환
      console.log(hashtags);
      setValues((prevValues) => ({ ...prevValues, [name]: hashtags }));
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(values.hashtags);
    const formData = new FormData(form);
    formData.append('creator', authUser._id);

    try {
      const response = await insertFAQArticle(no, formData);
      console.log(response);
      navigate(-1);
      setValues(INITIAL_VALUES);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(auth()).then((response) => {
      setAuthUser(response.payload);
    });
  }, []);

  return (
    <div>
      <Layout>
        <div className={styles.Write}>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              autoComplete='off'
              name='title'
              value={values.title}
              placeholder='title'
              onChange={handleInputChange}
              id={styles.title_txt}
            ></input>

            <textarea
              name='content'
              value={values.content}
              placeholder='content'
              onChange={handleInputChange}
              id={styles.content_txt}
            ></textarea>

            <input
              type='text'
              autoComplete='off'
              name='hashtags'
              value={values.hashtags}
              placeholder='hashtags'
              onChange={handleInputChange}
            ></input>
            <br />

            <button type='submit'>글쓰기</button>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default ArticleWrite;
