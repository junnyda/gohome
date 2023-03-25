import Layout from 'layout/Layout';
import { Col, Row } from 'react-bootstrap';
import MeetingCalender from './MeetingCalender';
import { useEffect, useState } from 'react';
import MyMeetingList from './MyMeetingList';
import styles from 'assets/css/component/meeting/Meeting.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserMeetings } from 'api';

function MyMeeting() {
  const [meeting, setMeeting] = useState([]);
  const userData = useSelector((state) => state.user.userData);

  const listLoad = async (id) => {
    console.log(id);
    const loadMeetings = await getUserMeetings(id);

    setMeeting(loadMeetings);
  };

  useEffect(() => {
    if (userData && userData._id) {
      listLoad(userData._id);
    }
  }, [userData]);

  return (
    <Layout>
      <div>
        <Row>
          <Col md={7}>
            {userData && (
              <MeetingCalender
                apiFunction={getUserMeetings}
                userId={userData._id}
                className={styles.Calender}
              />
            )}
          </Col>
          <Col md={5}>
            <MyMeetingList meeting={meeting} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default MyMeeting;
