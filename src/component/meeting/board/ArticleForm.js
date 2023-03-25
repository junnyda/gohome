import { useState } from 'react';
import styles from 'assets/css/component/meeting/Board.module.css';

const INITIAL_VALUES = {
  title: '',
  content: '',
  hashtags: [],
};

function ArticleForm({ initialValues, onSubmit, user }) {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const prevArticle = initialValues;
  console.log(`prevArticle: ${prevArticle.title}`);

  const handleChange = (name, value) => {
    if (name === 'hashtags') {
      const hashtags = value.split(','); // 입력된 값을 쉼표로 분리하여 배열로 변환
      console.log(hashtags);
      setFormData((prevValues) => ({ ...prevValues, [name]: hashtags }));
    } else {
      setFormData((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('creator', user._id);
    onSubmit(formData);
  };

  return (
    <div className={styles.Write}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='title'
            value={formData.title}
            placeholder='title'
            onChange={handleInputChange}
            id={styles.title_txt}
          />
        </div>
        <div>
          <textarea
            name='content'
            value={formData.content}
            placeholder='content'
            onChange={handleInputChange}
            id={styles.content_txt}
          />
        </div>

        <div>
          <input
            type='text'
            autoComplete='off'
            name='hashtags'
            value={formData.hashtags}
            placeholder='hashtags'
            onChange={handleInputChange}
          ></input>
        </div>
        <button type='submit'>{initialValues ? '수정' : '작성'}</button>
      </form>
    </div>
  );
}

export default ArticleForm;
