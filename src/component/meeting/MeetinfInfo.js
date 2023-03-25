import Board from './board';
import Layout from 'layout/Layout';
import { insertMember, getMeetingByNo } from 'api';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from 'actions/user_action';
import { useDispatch } from 'react-redux';
import MeetingModal from './MeetingModal';
import styles from 'assets/css/component/meeting/Meeting.module.css';

function MeetingInfo() {
  const { no } = useParams();
  const [meetinginfo, setMeetinginfo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [authUser, setAuthUser] = useState({});
  const dispatch = useDispatch();

  const genderData = {
    series: [70, 30],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Female', 'Male'],
      colors: ['#F2CDA6', '#A6CAF0'],
      title: {
        align: 'left',
        style: {
          fontSize: '20px',
          color: '#263238',
        },
      },
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  const agesData = {
    series: [30, 40, 30],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['20', '30', '40'],
      colors: ['#F2CDA6', '#A6CAF0', '#80C080'],
      title: {
        align: 'left',
        style: {
          fontSize: '20px',
          color: '#263238',
        },
      },
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  const PieChart = ({ options, series }) => {
    return <Chart options={options} series={series} type='pie' />;
  };

  const handleClick = async () => {
    try {
      const body = {
        userId: authUser._id,
      };
      console.log(body);
      console.log(no);
      const response = await insertMember(no, body);

      if (response.success === true) {
        setShowModal(true);
        setMessage('가입 신청이 완료되었습니다.');
      } else {
        setShowModal(true);
        setMessage('오류입니다');
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(() => {
    getMeetingByNo(parseInt(no)).then((meeting) => {
      setMeetinginfo(meeting);
    });
    dispatch(auth()).then((response) => {
      setAuthUser(response.payload);
    });
  }, []);

  return (
    <Layout className={styles.Meetinginfo}>
      <Container>
        <Row>
          <Col>
            <div>
              <h2>모임 이름 : {meetinginfo.title}</h2>
            </div>
            {meetinginfo.creator && (
              <div>
                <h2>모임장 : {meetinginfo.creator.name}</h2>
              </div>
            )}
            <div>
              <h2>정원 : {meetinginfo.maxNum}</h2>
            </div>
          </Col>
          <Col md={6} className={styles.chartContainer}>
            <PieChart options={genderData.options} series={genderData.series} />
            <PieChart options={agesData.options} series={agesData.series} />
          </Col>
        </Row>
        <Row>
          <Col className={styles.MeetingInfoButtons}>
            <Link to={`/meeting/group/${no}`}>
              <p>모임 게시판</p>
            </Link>
            <Link to={`/meeting/admin/${no}`}>
              <p>관리</p>
            </Link>
            <div>
              <p onClick={handleClick}>가입신청</p>
            </div>
            {showModal && (
              <MeetingModal message={message} onClose={handleCloseModal} />
            )}
          </Col>
        </Row>
        <Row>
          <Board title='FAQ' />
          <Board title='모임후기' />
        </Row>
      </Container>
    </Layout>
  );
}
export default MeetingInfo;
