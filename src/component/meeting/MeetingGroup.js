import Board from './board';
import Layout from 'layout/Layout';
import MeetingCalender from './MeetingCalender';
import { Col, Container, Row, Card, ProgressBar } from 'react-bootstrap';
import profile from 'assets/images/profile.png';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button } from 'react-bootstrap';
import ChatModal from './ChatModal';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import styles from 'assets/css/component/meeting/Meeting.module.css';
import { useMembers } from 'hooks/useMembers';
import { getOrdersByNo } from 'api';

function MeetingGroup() {
  const now = 60;
  const { no } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const members = useMembers(no);
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.on("chat message", (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlechat = () => {
    navigate(`/jo/${no}`);
  };

  return (
    <Layout className={styles.meeting}>
      <Container>
        <h5>모임원들이 보는 모임페이지</h5>
        <h2>모임명</h2>
        <Button onClick={() => handlechat(no)}>채팅 열기</Button>
        {/* <ChatModal
          show={showModal}
          handleClose={handleCloseModal}
          messages={messages}
        /> */}
        <Row>
          <Col>
            <MeetingCalender apiFunction={getOrdersByNo} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>#... #...</Card.Header>
              <Card.Body>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <p>지역</p>
          </Col>
        </Row>
        {members &&
          members.map((item, idx) => {
            return (
              <Row key={idx}>
                <Col>
                  <div className={styles.member}>
                    <img src={profile} />
                    {item.name}
                    <ProgressBar
                      className='attendanceBar'
                      now={now}
                      label={`${now}%`}
                    />
                  </div>
                </Col>
              </Row>
            );
          })}

        <Row>
          <Board title='모임원 게시판' />
        </Row>
      </Container>
    </Layout>
  );
}
export default MeetingGroup;
