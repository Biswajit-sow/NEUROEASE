import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Button from './Button'; // Assuming Button component exists
import LoadingSpinner from './LoadingSpinner'; // Assuming LoadingSpinner component exists
import ReactMarkdown from 'react-markdown'; // Ensure this is imported

// Define your backend API URL (use environment variables ideally)
const API_URL = 'http://localhost:3000/api/chat';

function ChatInterface({ category, type }) {
  const [messages, setMessages] = useState([]); // { sender: 'user'/'ai', text: '...' }
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); // To auto-scroll

  const categoryReadable = category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  const typeReadable = type.charAt(0).toUpperCase() + type.slice(1);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Optional: Send an initial greeting from the AI when component mounts
  // useEffect(() => {
  //   setMessages([{ sender: 'ai', text: `Hi! I'm here to help with ${categoryReadable} in ${typeReadable} Guidance. How can I assist you today?` }]);
  // }, [categoryReadable, typeReadable]);


  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null); // Clear previous errors

    // Prepare history for the backend
    const historyForBackend = messages.map(msg => ({
      sender: msg.sender,
      text: msg.text,
    }));

    try {
      const response = await axios.post(API_URL, {
        message: input,
        history: historyForBackend, // Send current message history
        category: category,
        type: type,
      });

      const aiResponse = { sender: 'ai', text: response.data.response };

      // Handle specific error messages from backend (if structured that way)
      if (response.data.error) {
        setError(`AI Note: ${response.data.response || response.data.error}`); // Show AI's message or error
      }

      // Add AI response even if there was a non-blocking note/error
      setMessages(prev => [...prev, aiResponse]);

    } catch (err) {
      console.error("Error sending message:", err);
      let errorMsg = 'Failed to get response from the server.';
      if (err.response && err.response.data && err.response.data.error) {
          errorMsg = `Error: ${err.response.data.error}`;
      } else if (err.request) {
          errorMsg = 'No response received from server. Is it running?';
      }
      setError(errorMsg);
      // Optionally add an error message to the chat
      // setMessages(prev => [...prev, { sender: 'ai', text: `Sorry, something went wrong: ${errorMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] bg-light to-purple-800 light:bg-light to-blue-500-500 rounded-lg shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-red-700 bg-green-500 dark:bg-gray-700">
        <h2 className="text-xl font-semibold text-center text-light to-blue-400-800 dark:text-gray-100">
          {typeReadable} Guidance: {categoryReadable} Expert
        </h2>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`prose prose-sm dark:prose-invert max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${ // Added prose classes for basic styling
                msg.sender === 'user'
                  ? 'bg-blue-300  text-gray-800' // Prose styles might conflict here, adjust if needed
                  : 'bg-gray-200 text-gray-800 bg-purple-300  text-gray-900'
              }`}
            >
              {/* Use ReactMarkdown to render message text */}
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {/* Placeholder for typing indicator or loading */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 bg-blue-400 rounded-lg px-4 py-2 flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-sm text-light to-blue-400 text-gray-900">Thinking...</span>
            </div>
          </div>
        )}
        {/* Error Display */}
        {error && (
             <div className="flex justify-center">
               <p className="text-red-500 dark:text-red-400 text-sm bg-red-100 dark:bg-red-900 px-3 py-1 rounded">{error}</p>
             </div>
        )}
        <div ref={messagesEndRef} /> {/* Anchor for scrolling */}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            disabled={isLoading}
          />
          <Button type="submit" variant="primary" disabled={isLoading || !input.trim()}>
            {isLoading ? <LoadingSpinner size="sm" /> : 'Send'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;