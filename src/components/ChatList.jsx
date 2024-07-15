import React, { useEffect, useState } from 'react';
import axios from 'axios';
import telegram from "../assets/telegram.webp"
const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 


  useEffect(() => {
    axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1')
      .then(response => {
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          setChats(response.data.data.data);
          setFilteredChats(response.data.data.data); 
        } else {
          setChats([]);
          setFilteredChats([]);
        }
      })
  }, []);

  useEffect(() => {
    setFilteredChats(
      chats.filter(chat => chat.creator && chat.creator.name && chat.creator.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, chats]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="w-full lg:w-1/4 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-xl font-bold">Telegram</h1>
      </div>  
      <div className="p-4 flex justify-between">
        <button className="text-blue-500 border-b-2 border-blue-500">All</button>
        <button className="text-gray-400">Regulars</button>
        <button className="text-gray-400">Unread</button>
        <button className="text-gray-400">Personal</button>
      </div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-gray-400"
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredChats.map(chat => (
          <div key={chat.id} className="p-4 flex items-center hover:bg-gray-800 cursor-pointer" onClick={() => onSelectChat(chat.id)}>
            <img src={telegram} alt="Avatar" className="rounded-full w-15 h-10 mr-3" />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <div className="font-bold">{chat.creator?.name || 'Unknown'}</div>
                <div className="text-sm text-gray-400">{new Date(chat.updated_at).toLocaleTimeString()}</div>
              </div>
              <div className="text-sm text-gray-400 truncate">{chat.last_msg}</div>
            </div>
            {chat.msg_count > 0 && (
              <div className="ml-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">{chat.msg_count}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
