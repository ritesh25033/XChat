// import React, { useState, useRef } from 'react';

// const MessageInput = ({ onSendMessage, onTyping }) => {
//   const [message, setMessage] = useState('');
//   const typingTimeoutRef = useRef(null);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setMessage(value);

//     // Handle typing indicator
//     onTyping(true);
    
//     // Clear existing timeout
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     // Set new timeout to stop typing indicator
//     typingTimeoutRef.current = setTimeout(() => {
//       onTyping(false);
//     }, 1000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage('');
//       onTyping(false);
      
//       // Clear typing timeout
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="message-input-container">
//       <form onSubmit={handleSubmit} className="message-form">
//         <div className="message-input-wrapper">
//           <button type="button" className="emoji-btn">😊</button>
//           <input
//             id="message-input"
//             type="text"
//             placeholder="Type your message..."
//             value={message}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             className="message-input"
//           />
//           <button
//             id="send-button"
//             type="submit"
//             className="send-btn"
//             disabled={!message.trim()}
//           >
//             📤
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;



import React, { useState, useRef } from 'react';

const MessageInput = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    onTyping(true);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onTyping(false);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="message-input-wrapper">
          <button type="button" className="emoji-btn">😊</button>
          <input
            id="message-input"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="message-input"
          />
          <button
            id="send-button"
            type="submit"
            className="send-btn"
            disabled={!message.trim()}
          >
            📤
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
