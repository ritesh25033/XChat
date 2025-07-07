// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { database } from '../../services/firebase';
// import { ref, push, onValue, serverTimestamp, set, off } from 'firebase/database';
// import MessageInput from './MessageInput';

// const ChatWindow = () => {
//   const { currentRoom, user } = useAuth();
//   const [messages, setMessages] = useState([]);
//   const [typingUsers, setTypingUsers] = useState({});
//   const [firebaseReady, setFirebaseReady] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Image error handler
//   const handleImageError = (e) => {
//     e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.target.alt)}&background=667eea&color=fff&size=40`;
//   };

//   // Check if Firebase is ready
//   useEffect(() => {
//     if (database) {
//       setFirebaseReady(true);
//       console.log('Firebase database is ready');
//     } else {
//       console.error('Firebase database is not initialized');
//       setFirebaseReady(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (currentRoom && firebaseReady && database) {
//       console.log('Setting up listeners for room:', currentRoom._id);
      
//       const messagesRef = ref(database, `messages/${currentRoom._id}`);
//       const typingRef = ref(database, `typing/${currentRoom._id}`);

//       const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log('Messages data received:', data);
        
//         if (data) {
//           const messagesList = Object.keys(data).map(key => ({
//             id: key,
//             ...data[key]
//           })).sort((a, b) => {
//             const aTime = a.timestamp || 0;
//             const bTime = b.timestamp || 0;
//             return aTime - bTime;
//           });
//           setMessages(messagesList);
//         } else {
//           setMessages([]);
//         }
//       }, (error) => {
//         console.error('Error listening to messages:', error);
//       });

//       const unsubscribeTyping = onValue(typingRef, (snapshot) => {
//         const data = snapshot.val();
//         setTypingUsers(data || {});
//       }, (error) => {
//         console.error('Error listening to typing:', error);
//       });

//       return () => {
//         console.log('Cleaning up listeners for room:', currentRoom._id);
//         off(messagesRef);
//         off(typingRef);
//       };
//     } else {
//       setMessages([]);
//       setTypingUsers({});
//     }
//   }, [currentRoom, firebaseReady]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const sendMessage = async (content) => {
//     if (!currentRoom || !content.trim() || !firebaseReady || !database) {
//       console.error('Cannot send message: missing requirements');
//       return;
//     }

//     try {
//       console.log('Sending message to room:', currentRoom._id);
//       const messagesRef = ref(database, `messages/${currentRoom._id}`);
      
//       const messageData = {
//         content: content.trim(),
//         senderId: user._id,
//         timestamp: Date.now()
//       };
      
//       await push(messagesRef, messageData);
//       console.log('Message sent successfully');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleTyping = async (isTyping) => {
//     if (!currentRoom || !firebaseReady || !database) return;

//     try {
//       const typingRef = ref(database, `typing/${currentRoom._id}/${user._id}`);
//       if (isTyping) {
//         await set(typingRef, {
//           isTyping: true,
//           timestamp: Date.now()
//         });
//       } else {
//         await set(typingRef, null);
//       }
//     } catch (error) {
//       console.error('Error updating typing status:', error);
//     }
//   };

//   if (!firebaseReady) {
//     return (
//       <div id="chat-window" className="chat-window">
//         <div className="no-chat-selected">
//           <div className="no-chat-icon">⚠️</div>
//           <h2>Connecting to Firebase...</h2>
//           <p>Please check your Firebase configuration</p>
//         </div>
//       </div>
//     );
//   }

//   const getOtherUser = () => {
//     if (!currentRoom || !user) return null;
//     return currentRoom.users.find(u => u._id !== user._id) || currentRoom.users[0];
//   };

//   const getUserById = (userId) => {
//     if (!currentRoom) return null;
//     return currentRoom.users.find(u => u._id === userId);
//   };

//   const otherUser = getOtherUser();
//   const isTyping = Object.keys(typingUsers).some(
//     userId => userId !== user?._id && typingUsers[userId]?.isTyping
//   );

//   if (!currentRoom) {
//     return (
//       <div id="chat-window" className="chat-window">
//         <div className="no-chat-selected">
//           <div className="no-chat-icon">💬</div>
//           <h2>No chat selected</h2>
//           <p>Select a conversation from the sidebar or start a new chat to begin messaging</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div id="chat-window" className="chat-window">
//       <div className="chat-header">
//         <div className="chat-user-info">
//           <div className="chat-avatar">
//             <img 
//               src={otherUser?.avatar} 
//               alt={otherUser?.fullName}
//               onError={handleImageError}
//             />
//           </div>
//           <div className="chat-user-details">
//             <div className="chat-user-name">{otherUser?.fullName}</div>
//             <div className="chat-user-status">Last seen 5 min ago</div>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button className="chat-action-btn">⋮</button>
//         </div>
//       </div>

//       <div className="messages-container">
//         {messages.length === 0 ? (
//           <div className="no-messages">
//             <div className="no-messages-icon">💬</div>
//             <h3>No messages yet</h3>
//             <p>Send a message to start the conversation</p>
//           </div>
//         ) : (
//           <div className="messages-list">
//             {messages.map((message) => {
//               const messageUser = getUserById(message.senderId);
//               const isOwnMessage = message.senderId === user._id;
              
//               return (
//                 <div
//                   key={message.id}
//                   className={`message ${isOwnMessage ? 'sent' : 'received'}`}
//                 >
//                   {!isOwnMessage && (
//                     <div className="message-avatar">
//                       <img 
//                         src={messageUser?.avatar} 
//                         alt={messageUser?.fullName}
//                         onError={handleImageError}
//                       />
//                     </div>
//                   )}
//                   <div className="message-bubble">
//                     <div className="message-content">
//                       {message.content}
//                     </div>
//                     <div className="message-time">
//                       {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], {
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       }) : 'Now'}
//                     </div>
//                   </div>
//                   {isOwnMessage && (
//                     <div className="message-avatar">
//                       <img 
//                         src={user?.avatar} 
//                         alt={user?.fullName}
//                         onError={handleImageError}
//                       />
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//             {isTyping && (
//               <div id="typing-indicator" className="typing-indicator">
//                 <div className="typing-dots">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//                 <span className="typing-text">{otherUser?.fullName} is typing...</span>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       <MessageInput onSendMessage={sendMessage} onTyping={handleTyping} />
//     </div>
//   );
// };

// export default ChatWindow;



import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { database } from '../../services/firebase';
import { ref, push, onValue, serverTimestamp, set, off } from 'firebase/database';
import MessageInput from './MessageInput';

const ChatWindow = () => {
  const { currentRoom, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [firebaseReady, setFirebaseReady] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (database) {
      setFirebaseReady(true);
    } else {
      setFirebaseReady(false);
    }
  }, []);

  useEffect(() => {
    if (currentRoom && firebaseReady && database) {
      const messagesRef = ref(database, `messages/${currentRoom._id}`);
      const typingRef = ref(database, `typing/${currentRoom._id}`);

      const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).sort((a, b) => {
            const aTime = a.timestamp || 0;
            const bTime = b.timestamp || 0;
            return aTime - bTime;
          });
          setMessages(messagesList);
        } else {
          setMessages([]);
        }
      });

      const unsubscribeTyping = onValue(typingRef, (snapshot) => {
        const data = snapshot.val();
        setTypingUsers(data || {});
      });

      return () => {
        off(messagesRef);
        off(typingRef);
      };
    } else {
      setMessages([]);
      setTypingUsers({});
    }
  }, [currentRoom, firebaseReady]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (content) => {
    if (!currentRoom || !content.trim() || !firebaseReady || !database) {
      return;
    }

    try {
      const messagesRef = ref(database, `messages/${currentRoom._id}`);
      const messageData = {
        content: content.trim(),
        senderId: user._id,
        timestamp: Date.now()
      };
      await push(messagesRef, messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = async (isTyping) => {
    if (!currentRoom || !firebaseReady || !database) return;

    try {
      const typingRef = ref(database, `typing/${currentRoom._id}/${user._id}`);
      if (isTyping) {
        await set(typingRef, {
          isTyping: true,
          timestamp: Date.now()
        });
      } else {
        await set(typingRef, null);
      }
    } catch (error) {
      console.error('Error updating typing status:', error);
    }
  };

  if (!firebaseReady) {
    return (
      <div id="chat-window" className="chat-window">
        <div className="no-chat-selected">
          <div className="no-chat-icon">⚠️</div>
          <h2>Connecting to Firebase...</h2>
          <p>Please check your Firebase configuration</p>
        </div>
      </div>
    );
  }

  const getOtherUser = () => {
    if (!currentRoom || !user) return null;
    return currentRoom.users.find(u => u._id !== user._id) || currentRoom.users[0];
  };

  const otherUser = getOtherUser();
  const isTyping = Object.keys(typingUsers).some(
    userId => userId !== user?._id && typingUsers[userId]?.isTyping
  );

  if (!currentRoom) {
    return (
      <div id="chat-window" className="chat-window">
        <div className="no-chat-selected">
          <div className="no-chat-icon">💬</div>
          <h2>No chat selected</h2>
          <p>Select a conversation from the sidebar or start a new chat to begin messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div id="chat-window" className="chat-window">
      <div className="chat-header">
        <div className="chat-user-info">
          <div className="chat-avatar">
            <img src={otherUser?.avatar} alt={otherUser?.fullName} />
          </div>
          <div className="chat-user-details">
            <div className="chat-user-name">{otherUser?.fullName}</div>
            <div className="chat-user-status">Last seen 5 min ago</div>
          </div>
        </div>
        <div className="chat-actions">
          <button className="chat-action-btn">⋮</button>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">💬</div>
            <h3>No messages yet</h3>
            <p>Send a message to start the conversation</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.senderId === user._id ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  {message.content}
                </div>
                <div className="message-time">
                  {message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Now'}
                </div>
              </div>
            ))}
            {isTyping && (
              <div id="typing-indicator" className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">{otherUser?.fullName} is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <MessageInput onSendMessage={sendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;
