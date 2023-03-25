import { updateArticle } from "api";
import Layout from "layout/Layout";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "assets/css/component/meeting/Board.module.css";

const INITIAL_VALUES = {
  title: "",
  content: "",
  writer: "",
  createAt: null,
};

function ArticleModiForm() {
  const navigate = useNavigate();
  const { id, no } = useParams();

  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // preventDefault(): 기본 동작 막는 함수

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);

    await updateArticle(id, formData);

    setValues(values);
  };

  return (
    <div>
      <Layout>
        <div>글 수정</div>
        <div className={styles.Write}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={values.title}
              placeholder={values.title}
              onChange={handleInputChange}
              id={styles.title_txt}
            ></input>

            <textarea
              name="content"
              value={values.content}
              placeholder="content"
              onChange={handleInputChange}
              id={styles.content_txt}
            ></textarea>

            <div id="post_submit">
              <button
                type="submit"
                value="create"
                onClick={() => {
                  navigate(-2);
                }}
              >
                <Link to={`/meeting/info/${no}`}>수정</Link>
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}

export default ArticleModiForm;
