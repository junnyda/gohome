import { useEffect, useState } from "react";
import { blogSearch } from "actions/bookapi";
import { Container, Col, Row } from "react-bootstrap";



const Libray = ({onBookSelect}) => {
  const [books, setBooks] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState([]);
 

  useEffect(() => {
    if (query.length > 0) {
      blogSearchHttpHandler(query, true);
    }
  }, [query]);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };

  const onTextUpdate = (e) => {
    setText(e.target.value);
  };

  const blogSearchHttpHandler = async (query, reset) => {
    const params = {
      query: query,
      sort: "accuracy",
      page: 1,
      size: 5,
    };

    const { data } = await blogSearch(params);
    if (reset) {
      setBooks(data.documents);
    } else {
      setBooks(books.concat(data.documents));
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    onBookSelect(book);
    const bookElements = document.getElementsByClassName("book");
  for (let i = 0; i < bookElements.length; i++) {
    bookElements[i].classList.remove("selected");
  }
  const selectedBookElement = document.querySelector(`.book[data-isbn="${book.isbn}"]`);
  if (selectedBookElement) {
    selectedBookElement.classList.add("selected");
  }
  };

  

  return (
    <div>
      <div>
        <label >도서 정보 불러오기 </label>
      <input
        type="search"
        placeholder="검색어를 입력하세요..."
        name="query"
        className="booksearchbox"
        onKeyDown={onEnter}
        onChange={onTextUpdate}
        value={text}
      />
      </div>
      

      <Container style={{height:"500px"}} className="cs">
        <Row>
          {books.map((book, index) => (
            <Col key={book.isbn}>
                 <div
      className={`book${selectedBook?.isbn === book.isbn ? " selected" : ""}`}
      data-isbn={book.isbn}
      onClick={() => handleBookSelect(book)}
    >
                <img src={book.thumbnail} alt={book.title} />
                <h5>{book.title}</h5>
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            {selectedBook && (
              <div>
                <h3 style={{margin:"20px"}}>{selectedBook.title}</h3>
                <p>{selectedBook.contents}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Libray;
