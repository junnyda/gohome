import Layout from '../../layout/Layout';
import Category from './Category';
import MeetingCalender from './MeetingCalender';
import UserForm from './UserForm';
import MeetingList from './MeetingList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from 'assets/css/component/meeting/Meeting.module.css';
import { getAllOrders } from 'api';

function Meeting() {
  return (
    <div className={styles.Meeting}>
      <Layout>
        <Row>
          <Col md={9}>{<MeetingCalender apiFunction={getAllOrders} />}</Col>
          <Col md={2} className={styles.UserForm}>
            <UserForm inLogin='True' />
          </Col>
        </Row>
        <Row className={styles.Category}>
          <Col>
            <Category />
          </Col>
        </Row>
        <Row>
          <Col className={styles.MeetingList}>
            <MeetingList title='wholeMeeting' />
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export default Meeting;
