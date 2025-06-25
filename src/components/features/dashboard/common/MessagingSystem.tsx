import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, File, X, Search, MoreVertical, ArrowLeft, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, subscriptions } from '../../../../lib/supabase';
import type { Database } from '../../../../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Message = Database['public']['Tables']['messages']['Row'] & {
  sender: Profile;
  receiver: Profile;
};

interface Conversation {
  otherUser: Profile;
  lastMessage: Message | null;
  unreadCount: number;
}

const MessagingSystem: React.FC<{ userRole: 'broker' | 'owner' }> = ({ userRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
      setupRealtimeSubscriptions();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    if (!user) return;

    try {
      // Get all messages for the user
      const allMessages = await db.messages.getConversations(user.id);
      
      // Group messages by conversation partner
      const conversationMap = new Map<string, Conversation>();
      
      allMessages.forEach(message => {
        const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
        const otherUser = message.sender_id === user.id ? message.receiver : message.sender;
        
        if (!conversationMap.has(otherUserId)) {
          conversationMap.set(otherUserId, {
            otherUser: otherUser!,
            lastMessage: message,
            unreadCount: 0
          });
        } else {
          const existing = conversationMap.get(otherUserId)!;
          if (new Date(message.created_at) > new Date(existing.lastMessage?.created_at || 0)) {
            existing.lastMessage = message;
          }
        }
        
        // Count unread messages
        if (message.receiver_id === user.id && !message.read) {
          const conversation = conversationMap.get(otherUserId)!;
          conversation.unreadCount++;
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (otherUserId: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      const data = await db.messages.getConversation(user.id, otherUserId);
      setMessages(data as Message[]);
      
      // Mark messages as read
      const unreadMessageIds = data
        .filter(msg => msg.receiver_id === user.id && !msg.read)
        .map(msg => msg.id);
      
      if (unreadMessageIds.length > 0) {
        await db.messages.markAsRead(unreadMessageIds);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    if (!user) return;

    const subscription = subscriptions.subscribeToMessages(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        const newMessage = payload.new;
        
        // If this message is for the currently selected conversation, add it to messages
        if (selectedConversation && 
            (newMessage.sender_id === selectedConversation.id || newMessage.receiver_id === selectedConversation.id)) {
          setMessages(prev => [...prev, newMessage]);
        }
        
        // Reload conversations to update last message and unread count
        loadConversations();
      }
    });

    return () => subscription.unsubscribe();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    try {
      const message = await db.messages.send({
        sender_id: user.id,
        receiver_id: selectedConversation.id,
        content: newMessage.trim(),
      });

      setMessages(prev => [...prev, message as Message]);
      setNewMessage('');
      loadConversations(); // Update conversations list
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSelectConversation = (otherUser: Profile) => {
    setSelectedConversation(otherUser);
    setShowConversations(false);
    loadMessages(otherUser.id);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.otherUser.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.otherUser.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          {selectedConversation ? (
            <>
              <button
                onClick={() => {
                  setSelectedConversation(null);
                  setShowConversations(true);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {selectedConversation.full_name}
              </h1>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold text-gray-800">Messages</h1>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="h-[calc(100vh-80px)] lg:h-screen flex">
        {/* Conversations List */}
        <div className={`${showConversations ? 'block' : 'hidden'} lg:block w-full lg:w-80 border-r border-gray-200 flex flex-col bg-white`}>
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Send className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500">No conversations yet</p>
                <p className="text-sm text-gray-400">Start a conversation to begin messaging</p>
              </div>
            ) : (
              filteredConversations.map(conversation => (
                <motion.div
                  key={conversation.otherUser.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => handleSelectConversation(conversation.otherUser)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.otherUser.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {conversation.otherUser.full_name?.charAt(0) || conversation.otherUser.email.charAt(0)}
                        </span>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.otherUser.full_name || conversation.otherUser.email}
                        </p>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage ? new Date(conversation.lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${!showConversations ? 'block' : 'hidden'} lg:block flex-1 flex flex-col bg-white`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {selectedConversation.full_name?.charAt(0) || selectedConversation.email.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {selectedConversation.full_name || selectedConversation.email}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.role}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-900"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <Send className="h-12 w-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">No messages yet</p>
                    <p className="text-sm text-gray-400">Start the conversation!</p>
                  </div>
                ) : (
                  messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-4">
                  <Send className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;