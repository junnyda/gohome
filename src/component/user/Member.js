import React from "react";
import Container from "react-bootstrap/Container";
import Layout from "./../../layout/Layout";
import { Col } from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { auth } from "actions/user_action";
import { useNavigate } from "react-router";

export const Member = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
    nickname: "",
    gender: "",
    imgpath: "",
  });

  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(auth()).then((response) => {
      if (response.payload.isAuth) {
        setUser({
          ...user,
          name: response.payload.name,
          email: response.payload.email,
          date: response.payload.date,
          nickname: response.payload.nickname,
          gender: response.payload.gender,
          password: response.payload.password,
          imgpath: response.payload.imgpath,
        });
      } else {
        // 로그인 하지 않은 경우 처리
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 사용자 정보 수정 API 호출
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", user.name);
    formData.append("password", user.password);
    formData.append("nickname", user.nickname);
    formData.append("gender", user.gender);
    formData.append("date", user.date);
    axios
      .put("/api/users/me", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        navigate("/");
        alert("수정되었습니다");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Layout>
      <Container>
        <div >
          <form>
            <label htmlFor="image">프로필 이미지 업로드</label>
            <input type="file" name="file" onChange={handleFileChange} />
          </form>
          <form>
            <label htmlFor="image">프로필 이미지</label>
            <img src={`${user.imgpath.path}`} alt="프로필 이미지" />
          </form>
          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="text"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">이메일 : </label>
            <label htmlFor="email">수정할수없습니다</label>
            <input
              type="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              name="nickname"
              value={user.nickname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">생년월일</label>
            <input
              type="date"
              id="date"
              value={user.date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>저장</button>
        </div>
      </Container>
    </Layout>
  );
};
export default Member;
