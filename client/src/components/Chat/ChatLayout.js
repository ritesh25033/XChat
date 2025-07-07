// import React, { useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import Sidebar from './Sidebar';
// import ChatWindow from './ChatWindow';
// import SearchModal from './SearchModal';
// import '../../styles/Chat.css';

// const ChatLayout = () => {
//   const { loadUserRooms, isSearchOpen } = useAuth();

//   useEffect(() => {
//     loadUserRooms();
//   }, []);

//   return (
//     <div id="chat-layout" className="chat-layout">
//       <Sidebar />
//       <ChatWindow />
//       {isSearchOpen && <SearchModal />}
//     </div>
//   );
// };

// export default ChatLayout;



import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import SearchModal from './SearchModal';
import '../../styles/Chat.css';

const ChatLayout = () => {
  const { loadUserRooms, isSearchOpen } = useAuth();

  useEffect(() => {
    loadUserRooms();
  }, []);

  return (
    <div id="chat-layout" className="chat-layout">
      <Sidebar />
      <ChatWindow />
      {isSearchOpen && <SearchModal />}
    </div>
  );
};

export default ChatLayout;
