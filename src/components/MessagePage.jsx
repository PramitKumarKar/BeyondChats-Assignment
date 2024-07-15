import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessagePage = ({ chatId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`)
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setMessages(response.data.data);
        } else {
          setMessages([]);
        }
      })
      .catch(error => {
        setError('Error fetching messages');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chatId]);

  if (loading) {
    return (
      <div className="w-full lg:w-3/4 bg-gray-800 text-white flex flex-col justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-3/4 bg-gray-800 text-white flex flex-col justify-center items-center">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <button onClick={onBack} className="text-blue-500">Back to Chats</button>
        <h1 className="text-xl font-bold">Chat {chatId}</h1>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`p-4 mb-4 rounded-lg ${message.sender_id === 1 ? 'bg-blue-600 ml-auto' : 'bg-gray-800'} max-w-md`}>
            <div className="text-sm text-gray-400">
              {new Date(message.created_at).toLocaleString() !== 'Invalid Date'
                ? new Date(message.created_at).toLocaleString()
                : 'Invalid Date'}
            </div>
            <div className="font-bold">{message.sender.name}</div>
            <div>{message.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
