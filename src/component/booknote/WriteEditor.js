import React, { useState, useEffect } from "react";
import { insertBoard, noteList } from "../../actions/borad_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../assets/css/component/note/WirteEdbook.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { Button, Form } from "react-bootstrap";

import Libray from "./searchbook";

const WriteEditor = () => {
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const [movieContent, setMovieContent] = useState({
    title: "",
    content: "",
  });

  
  const submitReview = (e) => {
    e.preventDefault();
    let body = {
      title: movieContent.title,
      content: movieContent.content,
      thumbnail: selectedBook.thumbnail,
      url: selectedBook.url,
      bookcontents: selectedBook.contents,
      booktitle: selectedBook.title,
      publisher: selectedBook.publisher,
      authors: selectedBook.authors,
      bookdatetime: selectedBook.datetime,
      category:category,
    };
    dispatch(insertBoard(body)).then((response) => {
      if (response.payload.success) {
        alert("등록완료");
        navigate("/booknote");
      }
    });
  };
  // const submitReview = (e) => {
  //   e.preventDefault();

  //   // 선택된 도서 정보 객체
  //   const bookInfo = selectedBook;

  //   let formData = new FormData();

  //   formData.append("title", movieContent.title);
  //   formData.append("content", movieContent.content);

  //   // 이미지 리스트도 formData에 추가
  //   for (let i = 0; i < imageList.length; i++) {
  //     formData.append("imageList", imageList[i]);
  //   }

  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };

  //   dispatch(noteList(formData, config)).then((response) => {
  //     if (response.payload.success) {
  //       alert("등록완료");
  //     }
  //   });
  // };

  // const submitReview = (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", movieContent.title);
  //   formData.append("content", movieContent.content);

  //   // 선택한 책 정보를 formData에 추가
  //   if (selectedBook) {
  //     formData.append("bookTitle", selectedBook.title);
  //     formData.append("bookAuthor", selectedBook.author);
  //     formData.append("bookPublisher", selectedBook.publisher);
  //     formData.append("bookThumbnail", selectedBook.thumbnail);
  //   }

  //   // 이미지 파일을 formData에 추가
  //   for (let i = 0; i < imageList.length; i++) {
  //     formData.append("images", imageList[i]);
  //   }

  //   axios
  //     .post("/api/notes", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     })
  //     .then((response) => {
  //       if (response.data.success) {
  //         alert("등록완료");
  //         navigate("/notes");
  //       } else {
  //         alert("등록 실패");
  //       }
  //     });
  // };
  const getValue = (e) => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
  };
  const onChangeImageInput = (e) => {
    setImageList([...imageList, ...e.target.files]);
  };
  return (
    <div >
      <Form onSubmit={submitReview}>
      <h1>독서 노트 만들기</h1>
      
      <Libray onBookSelect={handleBookSelect} />
        <div className="App">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">카테고리 선택</option>
  <option value="소설">소설</option>
  <option value="비소설">비소설</option>
  <option value="자기계발">자기계발</option>
  <option value="역사">역사</option>
</select>

          <div className="form-wrapper">
            <input
              className="title-input"
              type="text"
              placeholder="제목"
              onChange={getValue}
              name="title"
              style={{ width: "500px" }}
            />
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              multiple
              onChange={onChangeImageInput}
            />
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setMovieContent({
                  ...movieContent,
                  content: data,
                });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
         
          <Button variant="primary" type="submit">
            등록
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default WriteEditor;
