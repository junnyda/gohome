import Layout from '../../layout/Layout';
import book1 from 'assets/images/book1.jpg';
import book2 from 'assets/images/book2.jpg';
import book3 from 'assets/images/book3.jpg';
import book4 from 'assets/images/book4.jpg';
import book5 from 'assets/images/book5.jpg';
import 'assets/css/component/main/main.css';
import { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';

const images = [
  {
    title: '페스트',
    url: book1,
  },
  {
    title: '오만과 편견',
    url: book2,
  },
  {
    title: '달러구트 꿈 백화점',
    url: book3,
  },
  {
    title: '파친코',
    url: book4,
  },
  {
    title: '당신 인생의 이야기',
    url: book5,
  },
];

function Main() {
  const [currentImage, setCurrentImage] = useState({});
  const [nextImage, setNextImage] = useState({});
  const currentImageRef = useRef(null);
  const nextImageRef = useRef(null);

  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImage(images[randomIndex]);

    // 이전 이미지와 중복되지 않도록 처리
    let nextIndex = randomIndex;
    while (nextIndex === randomIndex) {
      nextIndex = Math.floor(Math.random() * images.length);
    }
    setNextImage(images[nextIndex]);

    // 일정 시간 간격으로 이미지 변경
    const intervalId = setInterval(() => {
      randomIndex = nextIndex;
      setCurrentImage(nextImage);

      // 이전 이미지와 중복되지 않도록 처리
      while (nextIndex === randomIndex) {
        nextIndex = Math.floor(Math.random() * images.length);
      }
      setNextImage(images[nextIndex]);
    }, 4500);

    // 컴포넌트 unmount 시 interval 제거
    return () => clearInterval(intervalId);
  }, [nextImage]);

  useEffect(() => {
    if (
      currentImageRef.current &&
      nextImageRef.current &&
      currentImageRef.current.classList
    ) {
      currentImageRef.current.classList.add('next');
      nextImageRef.current.classList.add('prev');
      const timeoutId = setTimeout(() => {
        currentImageRef.current.classList.remove('next');
        nextImageRef.current.classList.remove('prev');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentImage, nextImage]);

  return (
    <Layout>
      <Row className='image-wrapper'>
        <Col md={1}></Col>
        <Col md={2}>
          <h2>Hello</h2>
          <h3>{currentImage.title}</h3>
        </Col>
        <Col>
          <img
            src={currentImage.url}
            alt={currentImage.title}
            ref={currentImageRef}
          />
        </Col>
        <Col>
          <img src={nextImage.url} alt={nextImage.title} ref={nextImageRef} />
        </Col>
        <Col md={2} className='image-info'>
          <h2>Bye</h2>
          <h3>{nextImage.title}</h3>
        </Col>
        <Col md={1}></Col>
      </Row>
    </Layout>
  );
}

export default Main;
