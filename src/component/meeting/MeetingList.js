import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMeetings } from 'api';
import meetingImgSample from 'assets/images/meetingsample.jpg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from 'assets/css/component/meeting/Meeting.module.css';
import { Button } from 'react-bootstrap';

function MeetingList({ title }) {
  const [meetingItems, setmeetingItems] = useState([]);
  const [order, setOrder] = useState('autoIncrementField');

  const handleAutoIncrementFieldClick = () => setOrder('autoIncrementField');
  const handleFirstDateClick = () => setOrder('firstDate');

  const sortedItems = meetingItems.sort((a, b) => {
    if (order === 'autoIncrementField') {
      return b.autoIncrementField - a.autoIncrementField;
    } else if (order === 'firstDate') {
      return new Date(a.order[0].date) - new Date(b.order[0].date);
    }
  });

  // node api
  const listLoad = async (search) => {
    const { meetings } = await getMeetings();
    const sortedMeetings = meetings.sort(
      (a, b) => b.autoIncrementField - a.autoIncrementField
    );
    // console.log(sortedMeetings);
    setmeetingItems(sortedMeetings);
  };

  //오늘날짜 이전은 제외
  // const listLoad = async (search) => {
  //   const { meetings } = await getMeetings();
  //   const today = new Date();
  //   const filteredMeetings = meetings.filter(
  //     (meeting) => new Date(meeting.firstDate) >= today
  //   );
  //   const sortedMeetings = filteredMeetings.sort(
  //     (a, b) => b.autoIncrementField - a.autoIncrementField
  //   );
  //   setmeetingItems(sortedMeetings);
  // };

  useEffect(() => {
    listLoad();
  }, []);

  return (
    <div>
      <div> 
      <Button variant="outline-secondary" size="sm"  onClick={handleAutoIncrementFieldClick} style={{ marginLeft : '250px' }}>최신순</Button> 
        <Button variant="outline-secondary" size="sm"  onClick={handleFirstDateClick} style={{ marginRight: '300px' }}>최근날짜순</Button>
      </div>
      <div>
        {meetingItems
          ? meetingItems.map((item, idx) => {
              return (
                <Container className={styles.meetingList} key={idx}>
                  <Link
                    to={`/meeting/info/${item.autoIncrementField}`}
                    className={styles.meetings}
                  >
                    <Row>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <img src={item.imgFile} alt='sample' />
                      </Col>
                      <Col md={1}></Col>
                      <Col className={styles.meetingItem}>
                        <h5 className={styles.meetingTitle}>{item.title}</h5>
                        <p className={styles.meetingDetail}>
                          첫모임날짜: {item.order[0].date}/ 정원: {item.maxNum}{' '}
                          / 모임지역: {item.order[0].location}
                        </p>
                        {/* <Link to={""}> */}
                        {item.hashtags.map((hashTag, idx) => {
                          return (
                            <p className={styles.hashTag} key={idx}>
                              {hashTag}
                            </p>
                          );
                        })}
                        {/* </Link> */}
                        <p>모임 개설자: {item.creatorName}</p>
                      </Col>
                    </Row>
                  </Link>
                </Container>
              );
            })
          : ''}
      </div>
    </div>
  );
}
export default MeetingList;
