// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';

// const SearchModal = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { searchResults, searchUsers, initializeChat, dispatch, loadUserRooms } = useAuth();

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (term.trim()) {
//       searchUsers(term);
//     } else {
//       dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
//     }
//   };

//   const handleUserSelect = async (user) => {
//     try {
//       // Initialize the chat
//       const room = await initializeChat(user._id);
      
//       if (room) {
//         // Reload rooms to ensure we have the latest data
//         await loadUserRooms();
        
//         // Set the newly created room as current
//         dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
        
//         // Close the search modal
//         handleClose();
//       }
//     } catch (error) {
//       console.error('Error selecting user:', error);
//     }
//   };

//   const handleClose = () => {
//     dispatch({ type: 'SET_SEARCH_OPEN', payload: false });
//     setSearchTerm('');
//     dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
//   };

//   return (
//     <div id="user-search-modal" className="search-modal-overlay">
//       <div className="search-modal">
//         <div className="search-header">
//           <h2>Find People to Chat</h2>
//           <button id="close-search" onClick={handleClose} className="close-btn">
//             ✕
//           </button>
//         </div>
        
//         <div className="search-input-container">
//           <div className="search-input-wrapper">
//             <span className="search-icon">🔍</span>
//             <input
//               id="search-input"
//               type="text"
//               placeholder="Search by name, username, or email"
//               value={searchTerm}
//               onChange={handleSearch}
//               autoFocus
//             />
//           </div>
//         </div>

//         <div id="search-results-list" className="search-results">
//           {searchResults.map((user) => (
//             <div
//               key={user._id}
//               id={`user-result-${user._id}`}
//               onClick={() => handleUserSelect(user)}
//               className="search-result-item"
//             >
//               <div className="result-avatar">
//                 <img src={user.avatar} alt={user.fullName} />
//               </div>
//               <div className="result-info">
//                 <div className="result-name">{user.fullName}</div>
//                 <div className="result-username">@{user.username}</div>
//                 <div className="result-email">{user.email}</div>
//               </div>
//             </div>
//           ))}
//           {searchTerm && searchResults.length === 0 && (
//             <div className="no-results">
//               <p>No users found</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchModal;



import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SearchModal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchResults, searchUsers, initializeChat, dispatch, loadUserRooms } = useAuth();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim()) {
      searchUsers(term);
    } else {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
    }
  };

  const handleUserSelect = async (user) => {
    try {
      const room = await initializeChat(user._id);
      if (room) {
        await loadUserRooms();
        dispatch({ type: 'SET_CURRENT_ROOM', payload: room });
        handleClose();
      }
    } catch (error) {
      console.error('Error selecting user:', error);
    }
  };

  const handleClose = () => {
    dispatch({ type: 'SET_SEARCH_OPEN', payload: false });
    setSearchTerm('');
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
  };

  return (
    <div id="user-search-modal" className="search-modal-overlay">
      <div className="search-modal">
        <div className="search-header">
          <h2>Find People to Chat</h2>
          <button id="close-search" onClick={handleClose} className="close-btn">
            ✕
          </button>
        </div>
        
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="search-input"
              type="text"
              placeholder="Search by name, username, or email"
              value={searchTerm}
              onChange={handleSearch}
              autoFocus
            />
          </div>
        </div>

        <div id="search-results-list" className="search-results">
          {searchResults.map((user) => (
            <div
              key={user._id}
              id={`user-result-${user._id}`}
              onClick={() => handleUserSelect(user)}
              className="search-result-item"
            >
              <div className="result-avatar">
                <img src={user.avatar} alt={user.fullName} />
              </div>
              <div className="result-info">
                <div className="result-name">{user.fullName}</div>
                <div className="result-username">@{user.username}</div>
                <div className="result-email">{user.email}</div>
              </div>
            </div>
          ))}
          {searchTerm && searchResults.length === 0 && (
            <div className="no-results">
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
