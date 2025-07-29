import React, { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  MoreVertical,
} from "lucide-react";
import { SAMPLE_CONVERSATIONS } from "../utils/constants";
import { Conversation, Message } from "../types";
import u from "/src/assets/User.png";

export default function Messages() {
  const [conversations] = useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const sampleMessages: Message[] = [
    {
      id: "1",
      senderId: "1",
      senderName: "Sarah Mohamed",
      senderAvatar: u,
      content: "Hi! How did the product strategy implementation go?",
      timestamp: "10:30 AM",
      isRead: true,
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      senderAvatar: "",
      content:
        "It went really well! I was able to apply the framework we discussed and got great feedback from the team.",
      timestamp: "10:35 AM",
      isRead: true,
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Sarah Mohamed",
      senderAvatar: u,
      content:
        "That's fantastic! I'd love to hear more details in our next session.",
      timestamp: "10:40 AM",
      isRead: true,
    },
    {
      id: "4",
      senderId: "1",
      senderName: "Sarah Mohamed",
      senderAvatar: u,
      content: "Great session today! Let's schedule our next meeting.",
      timestamp: "2:15 PM",
      isRead: false,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      setMessageText("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id
                  ? "bg-blue-50 border-r-2 border-r-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participantAvatar}
                    alt={conversation.participantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.participantName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <div className="flex justify-end mt-1">
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={selectedConversation.participantAvatar}
                  alt={selectedConversation.participantName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {selectedConversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedConversation.participantName}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedConversation.isOnline
                    ? "Online"
                    : "Last seen 2 hours ago"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Phone size={18} />
              </button>

              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {sampleMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                    message.senderId === "me"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {message.senderId !== "me" && (
                    <img
                      src={message.senderAvatar}
                      alt={message.senderName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.senderId === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === "me"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip size={18} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-900 rounded transition-colors">
                  <Smile size={18} />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-600">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
