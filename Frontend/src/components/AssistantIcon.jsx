import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa'; // Using the robot icon from react-icons

const AssistantIcon = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]); // To store the chat messages
  const [userMessage, setUserMessage] = useState(''); // To handle user input
  const [isNewChat, setIsNewChat] = useState(false); // To check if it's a new chat session

  // Toggle the chat window when the icon is clicked
  const toggleChatWindow = () => {
    setShowChat((prev) => !prev);
  };

  // Handle the message input change
  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  // Handle message submission
  const handleMessageSubmit = (event) => {
    event.preventDefault();

    if (userMessage.trim()) {
      // Add the user's message to the chat
      setMessages([...messages, { sender: 'user', text: userMessage }]);

      // Bot response based on user input
      const botReply = getBotResponse(userMessage);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botReply },
        ]);
      }, 1000);
    }

    // Clear the input field
    setUserMessage('');
  };

  // Function to generate bot response
  const getBotResponse = (input) => {
    const lowerCaseInput = input.toLowerCase();

    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) {
      return 'Hello! How can I assist you today?';
    }
    if (lowerCaseInput.includes('how are you')) {
      return 'I am just a bot, but thanks for asking!';
    }
    if (lowerCaseInput.includes('help') || lowerCaseInput.includes('support')) {
      return 'I can assist you with any queries you have. Please type your question.';
    }
    if (lowerCaseInput.includes('bye') || lowerCaseInput.includes('goodbye')) {
      return 'Goodbye! Have a great day!';
    }

    // Default response
    return 'I am here to help! Please ask me something.';
  };

  // Start a new chat
  const startNewChat = () => {
    setMessages([]); // Clear previous messages
    setIsNewChat(true); // Set as new chat session
  };

  // Continue the current chat
  const continueChat = () => {
    setIsNewChat(false); // Continue with the current chat
  };

  return (
    <div>
      {/* Floating Icon */}
      <div
        className="assistant-icon"
        onClick={toggleChatWindow}
        style={styles.icon}
        aria-label="Open chat assistant"
      >
        <FaRobot size={40} />
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="chat-window" style={styles.chatWindow}>
          <div className="chat-header" style={styles.chatHeader}>
            <h3>How can I help you?</h3>
            <button
              onClick={toggleChatWindow}
              style={styles.closeButton}
              aria-label="Close chat window"
            >
              X
            </button>
          </div>

          {/* New Chat / Continue Chat Buttons */}
          {isNewChat === null && (
            <div style={styles.chatBody}>
              <p>Would you like to start a new chat or continue the previous one?</p>
              <button
                onClick={startNewChat}
                style={styles.newChatButton}
              >
                Start New Chat
              </button>
              <button
                onClick={continueChat}
                style={styles.continueChatButton}
              >
                Continue with Current Chat
              </button>
            </div>
          )}

          {/* Displaying the chat messages */}
          {isNewChat === false && (
            <div className="chat-body" style={styles.chatBody}>
              <div className="messages">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: message.sender === 'user' ? 'right' : 'left',
                    }}
                  >
                    <p
                      style={{
                        backgroundColor: message.sender === 'user' ? '#0084FF' : '#f1f1f1',
                        color: message.sender === 'user' ? 'white' : 'black',
                        padding: '10px',
                        borderRadius: '10px',
                        maxWidth: '80%',
                        margin: '5px 0',
                        display: 'inline-block',
                      }}
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input field and send button */}
              <div className="chat-footer" style={styles.chatFooter}>
                <form onSubmit={handleMessageSubmit} style={styles.chatForm}>
                  <input
                    type="text"
                    value={userMessage}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Type your message..."
                  />
                  <button type="submit" style={styles.sendButton}>Send</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Inline styles object
const styles = {
  icon: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#0084FF',
    color: 'white',
    borderRadius: '50%',
    padding: '15px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    transition: 'transform 0.2s ease',
  },
  chatWindow: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    width: '300px',
    maxHeight: '400px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  chatHeader: {
    padding: '10px',
    backgroundColor: '#0084FF',
    color: '#fff',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
  },
  closeButton: {
    background: 'none',
    color: 'white',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0 10px',
  },
  chatBody: {
    padding: '10px',
    flex: 1,
    overflowY: 'scroll',
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
  },
  chatFooter: {
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  },
  chatForm: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    width: '80%',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  sendButton: {
    backgroundColor: '#0084FF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  newChatButton: {
    backgroundColor: '#0084FF',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
  },
  continueChatButton: {
    backgroundColor: '#f1f1f1',
    color: '#333',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

// Exporting the AssistantIcon component
export default AssistantIcon;
