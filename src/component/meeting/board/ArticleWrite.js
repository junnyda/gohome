import ArticleForm from './ArticleForm';
import Layout from 'layout/Layout';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { insertFAQArticle } from 'api';

function ArticleWrite() {
  const { no } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);

  const handleSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await insertFAQArticle(no ? no : '', formData);
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h2>글 작성</h2>
      <ArticleForm onSubmit={handleSubmit} user={userData} />
    </Layout>
  );
}

export default ArticleWrite;
