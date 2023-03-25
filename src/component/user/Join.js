import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import styles from './Join.module.css';
import { registerUser } from '../../actions/user_action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from 'layout/Layout';

function Join(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [date, setDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState(null);
  // Call when input file type changes
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    setGender(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleName = (e) => {
    setNickname(e.target.value);
  };
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };
  const onChangeUserName = (e) => {
    setUserNameError(false);
    setUserName(e.target.value);
  };
  const onChangeEmail = (e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const validation = () => {
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);

    if (password && confirmPassword && userName && email) return true;
    else return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    console.log(formData);
    formData.append('file', image);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', userName);
    formData.append('gender', gender);
    formData.append('date', date);
    formData.append('nickname', nickname);
  
    dispatch(
      registerUser(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    ).then((reponse) => {
      if (reponse.payload.success) {
        navigate('/login');
        alert('회원가입이 완료되었습니다.');
      } else {
        alert('회원가입이 실패하엿습니다');
      }
    });
    if (validation()) return;
  };

  return (
    <Layout>
      <div>
        <div>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '30px',
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
            }}
          >
            Sign in
          </h1>
          <Container
            className={styles.panel}
            style={{ fontFamily: 'Dongle, sans-serif', width: '500px' }}
          >
            <Form>
              <>
                <form>
                <label htmlFor="image">프로필 이미지 업로드</label>
                  <input type='file' name='file' onChange={handleFileChange} />
              
                </form>
              </>
              <Form.Group as={Row} className='mb-3'>
                <Col sm>
                  <Form.Control
                    maxLength={20}
                    placeholder='닉네임'
                    value={nickname}
                    onChange={handleName}
                    style={{ marginTop: '30px' }}
                  />
                  {userNameError && (
                    <div className='invalid-input'>필수입니다.</div>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm>
                  <Form.Control
                    maxLength={20}
                    placeholder='이름'
                    value={userName}
                    onChange={onChangeUserName}
                  />
                  {userNameError && (
                    <div className='invalid-input'>필수입니다.</div>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm>
                  <Form.Control
                    maxLength={50}
                    type='input'
                    placeholder='이메일 주소'
                    value={email}
                    onChange={onChangeEmail}
                  />
                  {emailError && (
                    <div className='invalid-input'>
                      유효한 이메일 형식을 입력하십시오.
                    </div>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm>
                  <Form.Control
                    maxLength={20}
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={onChangePassword}
                  />
                  {passwordError && (
                    <div className='invalid-input'>
                      비밀번호는 8자 이상이어야 하며 문자와 숫자를 각각 하나
                      이상 포함해야 합니다{' '}
                    </div>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm>
                  <Form.Control
                    maxLength={20}
                    type='password'
                    placeholder='Password 확인'
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                  />
                  {confirmPasswordError && (
                    <div className='invalid-input'>
                      비밀번호가 일치하지 않았습니다.
                    </div>
                  )}
                </Col>
              </Form.Group>
              <Form.Group className='mb-3' style={{ display: 'flex' }}>
                <div className='form-check' style={{ margin: '10px' }}>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value='female'
                    id='flexRadioDefault1'
                    checked={gender === 'female'}
                    onChange={handleChange}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='flexRadioDefault1'
                  >
                    여자
                  </label>
                </div>

                <div className='as' style={{ margin: '10px' }}>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value='male'
                    id='flexRadioDefault2'
                    checked={gender === 'male'}
                    onChange={handleChange}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='flexRadioDefault2'
                  >
                    남자
                  </label>
                </div>
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm>
                  <Form.Control
                    maxLength={20}
                    type='date'
                    placeholder='생년월일'
                    value={date}
                    onChange={handleDate}
                  />
                </Col>
              </Form.Group>

              <br />
              <div className='d-grid gap-1'>
                <Button variant='secondary' onClick={onSubmit}>
                  가입하기
                </Button>
              </div>
            </Form>
            <br />
            <span className='text'>
              Have an account?{' '}
              <Link to='/login' className='link'>
                로그인 하기
              </Link>
            </span>
          </Container>
        </div>
      </div>
    </Layout>
  );
}

export default Join;
