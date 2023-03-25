import 'assets/css/layout/Layout.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { auth } from 'actions/user_action';
import axios from 'axios';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inlogin, setinlogin] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
const [user,setUser]= useState();
  const handleMouseEnter = (e) => {
    e.target.querySelector('::before');
  };

  const handleMouseLeave = (e) => {
    e.target.querySelector('::before');
  };

  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('로그아웃에 실패했습니다');
      }
    });
  };

  useEffect(() => {
    dispatch(auth()).then((response) => {
      setUser(response.payload)
      // 로그인 하지 않은상태
      if (!response.payload.isAuth) {
        setinlogin(true);
      } else {
        setinlogin(false);
      }
    });
  }, []);

  return (
    <header className='site-header'>
      <div className='container'>
        <nav>
          <ul className='nav-menu'>
            <li>
              <NavLink to={'/meeting'} activeclassname='active'>
                Meetings
              </NavLink>
            </li>
            <li>
              <NavLink to={'/mymeeting'} activeclassname='active'>
                My Meeting
              </NavLink>
            </li>
            <li>
              <NavLink to={'/booknote/notelist'} activeclassname='active'>
                Notes
              </NavLink>
            </li>
            <li>
              <NavLink to={'/booknote'} activeclassname='active'>
                My Note
              </NavLink>
            </li>
            <li>
              <NavLink to={'/note/notebookmark'} activeclassname='active'>
                Boomarked
              </NavLink>
            </li>
            <li>
              <NavLink to={'/community'} activeclassname='active'>
                Community
              </NavLink>
            </li>
            {inlogin ? (
              <li>
                <Link to={'/login'} className='login'>
                  Login-in
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to='#' onClick={onClickHandler} className='login'>
                    로그아웃 / {userInfo && userInfo.name + '님'}
                  </Link>
                </li>
                
                <li>
                  <Link to={`/member`} className="login">
                    회원정보
                  </Link>
                </li>
              </>
            )}{' '}
          </ul>
        </nav>
        <div></div>
      </div>
    </header>
  );
}

export default Navigation;
