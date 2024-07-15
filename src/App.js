import React, { useState } from 'react';
import ChatList from './components/ChatList';
import MessagePage from './components/MessagePage';

const App = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="flex h-screen">
      <ChatList onSelectChat={setSelectedChatId} />
      {selectedChatId ? (
        <MessagePage chatId={selectedChatId} onBack={() => setSelectedChatId(null)} />
      ) : (
        <div className="w-full lg:w-3/4 bg-gray-800 text-white flex flex-col justify-center items-center">
          <div>Select a chat to view messages</div>
        </div>
      )}
    </div>
  );
};

export default App;

