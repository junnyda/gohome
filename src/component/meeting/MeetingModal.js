import styles from 'assets/css/component/meeting/Meeting.module.css';

function MeetingModal(props) {
  return (
    <div className={styles.meeting_modal}>
      <div className={styles.meeting_modal_body}>
        <p>{props.message}</p>
        <button onClick={props.onClose}>확인</button>
      </div>
    </div>
  );
}

export default MeetingModal;
