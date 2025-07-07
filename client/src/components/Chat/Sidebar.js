// import React, { useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';

// const Sidebar = () => {
//   const { user, rooms, currentRoom, logout, dispatch, loadUserRooms } = useAuth();

//   useEffect(() => {
//     loadUserRooms();
//   }, []);

//   const handleImageError = (e) => {
//     e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.target.alt)}&background=667eea&color=fff&size=40`;
//   };

//   const handleNewChat = () => {
//     dispatch({ type: 'SET_SEARCH_OPEN', payload: true });
//   };

//   const handleRoomSelect = (room) => {
//     dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
//   };

//   const handleLogout = async () => {
//     await logout();
//     // Force page reload to ensure clean state
//     window.location.href = '/login';
//   };

//   const getOtherUser = (room) => {
//     if (!user || !room.users) return null;
//     return room.users.find(u => u._id !== user._id) || room.users[0];
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="user-info">
//           <div className="user-avatar">
//             <img 
//               src={user?.avatar} 
//               alt={user?.fullName}
//               onError={handleImageError}
//             />
//           </div>
//           <div className="user-details">
//             <div id="user-name" className="user-name">{user?.fullName}</div>
//             <div id="user-username" className="user-username">@{user?.username}</div>
//           </div>
//           <button id="logout-button" onClick={handleLogout} className="logout-btn">
//             🚪
//           </button>
//         </div>
//       </div>

//       <button id="new-chat-button" onClick={handleNewChat} className="new-chat-btn">
//         ➕ New Chat
//       </button>

//       <div className="recent-chats">
//         <h3>RECENT CHATS</h3>
//         <div id="chat-rooms-list" className="chat-rooms-list">
//           {rooms.length === 0 ? (
//             <div className="no-chats">
//               <div className="no-chats-icon">💬</div>
//               <p>No conversations yet</p>
//               <span>Search for users to start chatting</span>
//             </div>
//           ) : (
//             rooms.map((room) => {
//               const otherUser = getOtherUser(room);
//               return (
//                 <button
//                   key={room._id}
//                   id={`room-${room._id}`}
//                   onClick={() => handleRoomSelect(room)}
//                   className={`room-item ${currentRoom?._id === room._id ? 'active' : ''}`}
//                 >
//                   <div className="room-avatar">
//                     <img 
//                       src={otherUser?.avatar} 
//                       alt={otherUser?.fullName}
//                       onError={handleImageError}
//                     />
//                   </div>
//                   <div className="room-info">
//                     <div className="room-name">{otherUser?.fullName}</div>
//                     <div className="room-last-seen">Last seen 5 min ago</div>
//                   </div>
//                   <div className="room-time">12:45 PM</div>
//                 </button>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user, rooms, currentRoom, logout, dispatch, loadUserRooms } = useAuth();

  useEffect(() => {
    loadUserRooms();
  }, []);

  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.target.alt)}&background=667eea&color=fff&size=40`;
  };

  const handleNewChat = () => {
    dispatch({ type: 'SET_SEARCH_OPEN', payload: true });
  };

  const handleRoomSelect = (room) => {
    dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
  };

  const handleLogout = () => {
    logout();
    // Force complete page reload to ensure clean state
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  };

  const getOtherUser = (room) => {
    if (!user || !room.users) return null;
    return room.users.find(u => u._id !== user._id) || room.users[0];
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">
            <img 
              src={user?.avatar} 
              alt={user?.fullName}
              onError={handleImageError}
            />
          </div>
          <div className="user-details">
            <div id="user-name" className="user-name">{user?.fullName}</div>
            <div id="user-username" className="user-username">@{user?.username}</div>
          </div>
          <button id="logout-button" onClick={handleLogout} className="logout-btn">
            🚪
          </button>
        </div>
      </div>

      <button id="new-chat-button" onClick={handleNewChat} className="new-chat-btn">
        ➕ New Chat
      </button>

      <div className="recent-chats">
        <h3>RECENT CHATS</h3>
        <div id="chat-rooms-list" className="chat-rooms-list">
          {rooms.length === 0 ? (
            <div className="no-chats">
              <div className="no-chats-icon">💬</div>
              <p>No conversations yet</p>
              <span>Search for users to start chatting</span>
            </div>
          ) : (
            rooms.map((room) => {
              const otherUser = getOtherUser(room);
              return (
                <button
                  key={room._id}
                  id={`room-${room._id}`}
                  onClick={() => handleRoomSelect(room)}
                  className={`room-item ${currentRoom?._id === room._id ? 'active' : ''}`}
                >
                  <div className="room-avatar">
                    <img 
                      src={otherUser?.avatar} 
                      alt={otherUser?.fullName}
                      onError={handleImageError}
                    />
                  </div>
                  <div className="room-info">
                    <div className="room-name">{otherUser?.fullName}</div>
                    <div className="room-last-seen">Last seen 5 min ago</div>
                  </div>
                  <div className="room-time">12:45 PM</div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
