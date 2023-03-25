import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/css/component/note/WirteEdbook.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import Libray from "./searchbook";
import { useParams } from "react-router-dom";
import Layout from './../../layout/Layout';
const Booknoteupdate = () => {
  const dispatch = useDispatch();
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null); // 추가: 수정할 데이터 상태
  const [selectedBook, setSelectedBook] = useState(null);
  const { id } = useParams();
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const [movieContent, setMovieContent] = useState({
    title: "",
    content: "",
  });
  const cancle = (e) => {
    e.preventDefault();
  
    navigate(`/booknote/${id}`);
  };

  useEffect(() => {
    const fetchPostData = async () => {
        try {
            const res = await axios.get(`/api/notelist/${id}`, {
        
            });
        
            setPostData(res.data);
            setMovieContent({
              title: res.data.title,
              content: res.data.content,
            });
        setSelectedBook({
          title: res.data.booktitle,
          thumbnail: res.data.thumbnail,
          url: res.data.url,
          contents: res.data.bookcontents,
          publisher: res.data.publisher,
          authors: res.data.authors,
          datetime: res.data.bookdatetime,
        });
    
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchPostData();
    }
       
  }, [id]);
 
  const handleSubmit = (e) => {
    e.preventDefault(); // Form 요소의 기본 동작을 방지합니다.

    let body = {
      title: movieContent.title,
      content: movieContent.content,
    };
    axios
      .put(`/api/notelist/${id}`, body)
      .then((response) => {
   
        alert("수정완료 되었습니다");
        navigate("/booknote")
      })
      .catch((error) => {
        console.error(error);
        // 리뷰 업데이트 실패 시 처리할 코드
      });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
    setPostData({
      ...postData,
      note: {
        ...postData.note,
        [name]: value,
      },
    });
  };

  const onChangeImageInput = (e) => {
    setImageList([...imageList, ...e.target.files]);
  };
  return (
    <Layout>
     
      <Container className="cs">
        <h1 style={{ marginLeft: "20px" }}>독서 노트 만들기</h1>
        <Libray  />
        <div className="App">
          <div className="form-wrapper">
            <input
              className="title-input"
              type="text"
              placeholder="제목"
              onChange={getValue}
              name="title"
              style={{ width: "500px" }}
              value={postData?.note.title || ""}
            />

            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              multiple
              onChange={onChangeImageInput}
            />
            <CKEditor
              editor={ClassicEditor}
              data={postData?.note.content || ""}
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

          <Button variant="primary" onClick={handleSubmit}>
            수정완료
          </Button>

          <Button variant="primary" type="submit" onClick={cancle} >
            수정 취소

          </Button>
        </div>
        </Container>
    
    </Layout>
  );
};

export default Booknoteupdate;
