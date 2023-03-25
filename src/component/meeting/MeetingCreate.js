import Layout from 'layout/Layout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from 'assets/css/component/meeting/Meeting.module.css';
import FileInput from './FileInput';
import { auth } from 'actions/user_action';
import { useDispatch } from 'react-redux';
import { createMeetings } from 'api';

function MeetingCreate() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState({});
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    creator: '',
    title: '',
    maxNum: 0,
    types: { writing: false, discussion: false },
    hashtags: [],
    location: '',
    category: { novel: false, poem: false, science: false },
    genderOpened: '',
    ageOpened: '',
    introduce: '',
    firstDate: '',
    imgFile: null,
  });

  const handleChange = (name, value, id) => {
    if (id === 'types') {
      setValues((prevValues) => ({
        ...prevValues,
        types: {
          ...prevValues.types,
          [name]: !prevValues.types[name],
        },
      }));
    } else if (id === 'category') {
      setValues((prevValues) => ({
        ...prevValues,
        category: {
          ...prevValues.category,
          [name]: !prevValues.category[name],
        },
      }));
    } else if (name === 'maxNum') {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: Number(value) || 0,
      }));
    } else if (name === 'hashtags') {
      const hashtags = value.split(','); // 입력된 값을 쉼표로 분리하여 배열로 변환
      setValues((prevValues) => ({ ...prevValues, [name]: hashtags }));
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, id } = e.target;
    handleChange(name, value, id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target; // 이벤트가 발생한 폼 요소
    console.log(form);
    const formData = new FormData(form); // 폼 데이터 추출
    formData.append('creator', authUser._id);
    formData.append('imgFile', values.imgFile);

    try {
      const response = await createMeetings(formData);
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(auth()).then((response) => {
      setAuthUser(response.payload);
    });
  }, []);

  return (
    <Layout>
      <Form onSubmit={handleSubmit} className={styles.meetingCreateForm}>
        <Form.Group controlId='meetingTitle'>
          <Form.Label>모임명</Form.Label>
          <Form.Control
            name='title'
            type='text'
            placeholder='모임명'
            value={values.title}
            onChange={handleInputChange}
          />
          <Form.Text>모임명을 적어주세요</Form.Text>
        </Form.Group>
        <Form.Group controlId='meetingMaxNum'>
          <Form.Label>정원</Form.Label>
          <Form.Control
            name='maxNum'
            type='number'
            min='2'
            max='10'
            placeholder='2~10'
            value={values.maxNum}
            onChange={handleInputChange}
          />
          <Form.Text>
            정원은 숫자로만 입력 가능하며, 2명~10명 사이입니다
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='meetingType'>
          모임방식
          <div key={`inline-checkbox`}>
            <Form.Check
              inline
              label='글쓰기'
              name='writing'
              type='checkbox'
              id='types'
              value={values.types.writing}
              checked={values.types.writing}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              label='토론'
              name='discussion'
              type='checkbox'
              id='types'
              value={values.types.discussion}
              checked={values.types.discussion}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='category'>
          카테고리
          <div key={`inline-checkbox`}>
            <Form.Check
              inline
              label='소설'
              name='novel'
              type='checkbox'
              id='category'
              checked={values.category.novel}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              label='시'
              name='poem'
              type='checkbox'
              id='category'
              checked={values.category.poem}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              label='과학'
              name='science'
              type='checkbox'
              id='category'
              checked={values.category.science}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='hashtags'>
          <Form.Label>해시태그</Form.Label>
          <Form.Control
            name='hashtags'
            type='text'
            value={values.hashtags}
            placeholder='#'
            onChange={handleInputChange}
          />
          <Form.Text>해시태그는 ,(쉼표)로 구분합니다</Form.Text>
        </Form.Group>

        <Form.Group controlId='meetingTitle'>
          <Form.Label>지역</Form.Label>
          <Form.Control
            name='location'
            type='text'
            placeholder='지역'
            value={values.location}
            onChange={handleInputChange}
          />
          <Form.Text>모임이 열릴 지역을 적어주세요</Form.Text>
        </Form.Group>

        <Form.Group controlId='gender'>
          성비
          <div key={`inline-radio`}>
            <Form.Check
              inline
              label='공개'
              name='genderOpened'
              type='radio'
              id='genderOpened'
              value='true'
              checked={values.genderOpened === 'true'}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              label='비공개'
              name='genderOpened'
              type='radio'
              id='genderOpened'
              value='false'
              checked={values.genderOpened === 'false'}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='ages'>
          연령비
          <div key={`inline-radio`}>
            <Form.Check
              inline
              label='공개'
              name='ageOpened'
              type='radio'
              id='ageOpened'
              value='true'
              checked={values.ageOpened === 'true'}
              onChange={handleInputChange}
            />
            <Form.Check
              inline
              label='비공개'
              name='ageOpened'
              type='radio'
              id='ageOpened'
              value='false'
              checked={values.ageOpened === 'false'}
              onChange={handleInputChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId='meetingTitle'>
          <Form.Label>모임소개</Form.Label>
          <Form.Control
            name='introduce'
            as='textarea'
            type='text'
            placeholder='모임 소개'
            value={values.introduce}
            onChange={handleInputChange}
          />
          <Form.Text>모임 소개글을 상세히 적어주세요</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>첫 모임 예정일</Form.Label>
          <Form.Control
            type='date'
            name='firstDate'
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Label>프로필</Form.Label>
        <FileInput
          name='imgFile'
          value={values.imgFile}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <Form.Text>프로필 사진은 jpg, png만 지원합니다</Form.Text>

        <Button variant='outline-secondary' type='submit'>
          제출
        </Button>
      </Form>
    </Layout>
  );
}

export default MeetingCreate;
