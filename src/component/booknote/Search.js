import axios from 'axios';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import '../../assets/css/component/note/Booknote.css';
import styles from '../../assets/css/component/note/Booknote.module.css';

function SearchBar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [notelist, setNoteList] = useState([]);
  let [countspan, setcountspan] = useState(5);
  const [categoryname, setcategoryname] = useState([]);
  useEffect(() => {
    axios.get('/api/category').then((response) => {
      setcategoryname(response.data);

  
    });
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 막기

    try { 
      const response = await axios.get(`/search?keyword=${query}`,{ headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              } });
      setResults(response.data);
 console.log(results)
    } catch (error) {
      console.error(error);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    axios.get('/api/users/auth').then((response) => {
      if (response.data.isAuth) {
        axios.get('/api/notelist/user').then((response) => {
          setNoteList(response.data);
     
        });
      } else {
          navigate('/');
        }
    });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <select
          className='form-select'
          style={{ width: '300px', fontSize: '1.4em' }}
        >
          {categoryname.map((category) => {
            return (
              <option key={category.category} value={category}>
                {category.category}
              </option>
            );
          })}
        </select>
        <div>
          <input
            className='asdfg'
            type='text'
            placeholder='Search'
            aria-label='Search'
            style={{ fontSize: '1.5em', borderRadius: '10px' }}
            value={query}
            onChange={handleQueryChange}
          />
          <button className='btn btn-outline-success' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <div key={result.id} className={styles.booklist}>
                <Col md={2} className={styles.tumb}>
                  <img src={result.thumbnail} alt='thumbnail'></img>
                </Col>

                <Col className={styles.booknotelisttitle1}>
                  <h3 style={{ margin: '15px' }}>#카테고리</h3>
                  <h3 style={{ margin: '15px' }}>
                    <Link to={`/booknote/${result._id}`}>
                      제목: {result.title}
                    </Link>
                  </h3>

                  <h5 style={{ margin: '10px' }}>
                    내용: {parse(result.content)}
                  </h5>
                </Col>

                <div className='booknotelisticon' style={{ display: 'block' }}>
                  <span
                    style={{ height: '100px' }}
                    onClick={() => {
                      setcountspan(countspan + 1);
                    }}
                  >
                    👍{countspan}
                  </span>
                  <br />
                </div>
              </div>
            ))}
          </ul>
        ) : (
          query.length === 0 && (
            <div>
              {notelist.map((booknotlist) => {
                return (
                  <div
                    key={booknotlist._id}
                    className='booklist'
                    style={{
                      paddingTop: '30px',
                      paddingBottom: '20px',
                      display: 'flex',
                      borderBottom: '1px solid  #e6e0e0',
                    }}
                  >
                    <Col md={2} className='tumb'>
                      <img src={booknotlist.thumbnail} alt='thumbnail'></img>
                    </Col>
                    <Col
                      className='booknotelisttitle1'
                      style={{
                        width: '900px',
                      }}
                    >
                      <h3 style={{ margin: '15px' }}>#카테고리</h3>
                      <h3 style={{ margin: '15px' }}>
                        <Link to={`/booknote/${booknotlist._id}`}>
                          제목: {booknotlist.title}
                        </Link>
                      </h3>

                      <h5 style={{ margin: '10px' }}>
                        내용: {parse(booknotlist.content)}
                      </h5>
                    </Col>
                    <div
                      className='booknotelisticon'
                      style={{ display: 'block' }}
                      key={booknotlist.id} // key prop 추가
                    >
                      <span
                        style={{ height: '100px' }}
                        onClick={() => {
                          setcountspan(countspan + 1);
                        }}
                      >
                        👍{countspan}
                      </span>
                      <div>조회수: {booknotlist.hit}</div>
                      <br />
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}
export default SearchBar;