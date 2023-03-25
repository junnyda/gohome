import 'assets/css/App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './component/main/index';
import Community from './component/community';
import Meeting from './component/meeting';
import MeetingInfo from 'component/meeting/MeetinfInfo';
import ArticleView from 'component/meeting/board/ArticleView';
import ArticleWrite from 'component/meeting/board/ArticleWrite';
import ArticleModiForm from 'component/meeting/board/ArticleModiForm';
import ArticleEdit from 'component/meeting/board/ArticleEdit';
import LoginPage from 'component/user/Login';
import Join from 'component/user/Join';
import Booknote from 'component/booknote/Booknote';
import Writebook from './component/booknote/Writebook';
import Booknoteno from './component/booknote/Booknoteno';
import MeetingCreate from 'component/meeting/MeetingCreate';
import MeetingGroup from 'component/meeting/MeetingGroup';
import MeetingAdmin from 'component/meeting/MeetingAdmin';
import Booknoteupdate from 'component/booknote/Booknoteupdate';
import MyMeeting from 'component/meeting/MyMeeting';
import Progress from 'component/booknote/Progress';
import axios from 'axios';
import Chat from 'components/chat';
import Jofrom from 'components/jofrom';
import { Member } from './component/user/Member';
import Rangking from 'component/booknote/booknoteRangking/Rangking';

axios.defaults.withCredentials = true;
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/join' element={<Join />} />
      <Route path='/member' element={<Member />} />
      <Route path='meeting'>
        <Route index element={<Meeting />} />
        <Route path='info/:no' element={<MeetingInfo />} />
        <Route path='info/:no/:id' element={<ArticleView />} />
        <Route path='info/:no/modi/:id' element={<ArticleEdit />} />
        <Route path='group/:no' element={<MeetingGroup />} />
        <Route path='group/:no/:id' element={<ArticleView />} />
        <Route path='admin/:no' element={<MeetingAdmin />} />
        <Route path=':no/write' element={<ArticleWrite />} />
        <Route path='createmeeting' element={<MeetingCreate />} />
      </Route>
      <Route path='mymeeting' element={<MyMeeting />} />
      <Route path='jo/:no' element={<Jofrom></Jofrom>} />
      <Route path='chat' element={<Chat></Chat>} />
      <Route path='community' element={<Community />} />
      <Route path='booknote'>
        <Route index element={<Booknote />} />
        <Route path='notelist' element={<Rangking />} />
        <Route path='writebook' element={<Writebook />} />
        <Route path=':id' element={<Booknoteno />} />
        <Route path=':id/edit' element={<Booknoteupdate />} />
        <Route path='progress' element={<Progress />} />
      </Route>
    </Routes>
  );
};

export default App;
