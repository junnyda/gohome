import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../actions/user_action';
import styles from './Login.module.css';
import Auth from 'hoc/auth';
import Layout from 'layout/Layout';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem('token', response.payload.usertoken);

        navigate('/');
      } else {
        alert('Error');
      }
    });
  };
  return (
    <Layout>
      <div className={styles.login}>
        <div id='container'>
          <div className='content'>
            <div className={styles.Loginwrap}>
              <h1
                style={{
                  textAlign: 'center',
                  fontFamily: "Georgia, 'Times New Roman', Times, serif",
                }}
              >
                Log-in
              </h1>
              <ul className={styles.menuwrap} role='tablist'></ul>
              {/*아이디 비밀번호 input */}
              <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
              >
                <ul className={styles.panelwrap}>
                  <li className={styles.pitem}>
                    <div className={styles.pinner}>
                      <div className='id-pw'>
                        <div className={styles.inputrow} id='id-line'>
                          <div className='icon-cell'></div>
                          <input
                            type='email'
                            value={email}
                            onChange={onEmailHandler}
                            placeholder='이메일'
                          />
                        </div>
                        <div className={styles.inputrow}>
                          <div className='icon-cell'></div>
                          <input
                            type='password'
                            value={password}
                            onChange={onPasswordHandler}
                            placeholder='비밀번호'
                          />
                        </div>
                      </div>
                      <div className={styles.loginuder}></div>
                      <div className={styles.btnlogin}>
                        <button type='sumbit' className={styles.btn1}>
                          <span className={styles.btntext}>로그인</span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
            <ul className={styles.find}>
              <li>
                <Link to={'/join'} className={styles.findtext}>
                  회원가입
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Auth(LoginPage, false);
