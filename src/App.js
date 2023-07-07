import { Route, Routes } from 'react-router-dom';
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import AddRoomModal from './modals/AddRoomModal'
import InviteMemberModal from './modals/InviteMemberModal';
import { generateKeywords }  from './firebase/services';


function App() {
  console.log('TEST: ', generateKeywords('dao nguyen'))
  return (
    <div className="container">
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ChatRoom />} />
          <Route path='*' element={<NotFound />} />
      </Routes>
      <AddRoomModal />
      <InviteMemberModal />
    </div>
  );
}

export default App;
