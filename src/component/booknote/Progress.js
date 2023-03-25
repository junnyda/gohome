import Layout from 'layout/Layout'
import React from 'react'
import { useState } from 'react';
import { Container } from 'react-bootstrap/esm';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import "./Progress.css"
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from 'actions/user_action';
const Label = ({ value }) => (
  <div className="d-flex justify-content-between">
    <span>목표까지 {value}% 완료</span>
    <span>{value}%</span>
  </div>
);

export default function Progress(props) {
  const {target,setTarget}= props;
  // const [target, setTarget] = useState('');
  const [current, setCurrent] = useState('');
  const [value, setValue] = useState(0);
  const [avg, setAvg] = useState(0);
  const[id,setId]= useState();
const dispatch =useDispatch();
  const handleTargetChange = (event) => {
    setTarget(event.target.value);
  };

  const handleCurrentChange = (event) => {
    setCurrent(event.target.value);
  };



  useEffect(() => {
    dispatch(auth()).then((response) => {
      const { _id } = response.payload;
      setId(_id);
      axios.get(`/api/user/${_id}/bookgoal`)
        .then((res) => {
          setTarget(res.data.bookGoal);
          setCurrent(res.data.postCount);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const percentage = Math.floor((current / target) * 100); // percentage 값을 계산하여 저장함
    setValue(percentage);
  
    // 평균 하루 독서량 계산
    const days = Math.ceil(target - current);
    const average = days > 0 ? Math.ceil((target - current) / days) : target - current;
    setAvg(average);
  
     axios.put(`/api/users/${id}/bookgoal`, { bookGoal: target })
    .then((res) => {
     
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const handleReset = () => {
    setValue(0);
    setTarget('');
    setCurrent('');
    setAvg(0);
  };
  // 남은 권수를 계산하여 반환하는 함수
  const getRemainingCount = () => {
    if (target && current) {
      const remainingCount = target - current;
      return `${remainingCount}권 남음`;
    }
    return '';
  }

  return (
    <Container>
      <ProgressBar now={value} style={{margin:"10px"}}/>
      <div className="count-wrapper">
        <div className="count">{getRemainingCount()}</div>
      </div>
      <Label value={value} />
      <form onSubmit={handleSubmit}>
        <label>
          목표 권수:
          <input type="number" value={target} onChange={handleTargetChange} />
        </label>
        <br />
        <label>
          현재 권수:
          <input type="number" value={current} onChange={handleCurrentChange} />
        </label>
        <br />
        <div className="summary">
          <span>
     
            {avg > 0 && `하루 평균 ${avg}권 읽어야 달성 가능합니다.`}
          </span>
        </div>
        <Button type="submit">설정하기</Button>
        <Button onClick={handleReset}>초기화</Button>
      </form>
    </Container>
  );
}