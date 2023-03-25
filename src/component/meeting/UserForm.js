import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUserMeetings } from 'api';
import { fontSize } from '@mui/system';

function UserForm() {
  const [meeting, setMeeting] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);

  const userData = useSelector((state) => state.user.userData);

  const handleNext = () => {
    setStartIndex(startIndex + 3);
    setEndIndex(endIndex + 3);
  };

  const handlePrev = () => {
    setStartIndex(startIndex - 3);
    setEndIndex(endIndex - 3);
  };

  const listLoad = async (id) => {
    const loadMeetings = await getUserMeetings(id);

    const meetings = loadMeetings.map((meeting) => ({
      title: meeting.title,
      role: meeting.members[0].role,
      memberStatus: meeting.members[0].status,
      no: meeting.autoIncrementField,
    }));

    const sortedMeetings = meetings.sort((a, b) => b.no - a.no);
    setMeeting(sortedMeetings);
    // memberStatus가 'host', 'full_member'인 모임만 보이게
    // const filteredMeetings = sortedMeetings.filter(
    //   (meeting) =>
    //     meeting.memberStatus === 'host' ||
    //     meeting.memberStatus === 'full_member'
    // );
    // setMeeting(filteredMeetings);
  };

  useEffect(() => {
    if (userData && userData.name) {
      listLoad(userData._id);
    }
  }, [userData]);

  return (
    <div className='user-form'>
      {userData && userData.name ? (
        <div>
       <p><strong style={{fontSize: '2.2em'}}>{userData.name}</strong>님 안녕하세요</p>

          {meeting && (
            <>
              {meeting.slice(startIndex, endIndex).map((item, idx) => {
                return (
                  <div className='bnt-user-meeting' key={idx}>
                    <a href={`http://localhost:3000/meeting/group/${item.no}`}>
                      <Button variant="outline-dark" size="lg" style={{width:'100%',marginBottom:'20px'}}>
                        {item.title}/{item.memberStatus}
                      </Button>
                    </a>
                  </div>
                );
              })}
              <button onClick={handlePrev} disabled={startIndex === 0} style={{float:'left', marginLeft:'20px', marginTop:'10px'}}>
                &lt;
              </button>
              <button
                onClick={handleNext}
                disabled={endIndex >= meeting.length}
                style={{float:'right', marginRight:'20px', marginTop:'10px'}}
              >
                &gt;
              </button>
            </>
          )}
          <div style={{height:'0px'}}></div>
          <p>
            <Link to='/meeting/createmeeting'>
              <Button variant='primary' size='lg' style={{marginTop:'50px'}}>
                모임개설
              </Button>
            </Link>
          </p>
        </div>
      ) : (
        '로그인'
      )}
    </div>
  );
}

export default UserForm;
