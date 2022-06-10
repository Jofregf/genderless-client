import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import MessageBox from './MessageBox';
import socketServer from '../Socket';
import './chat.css';

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};

function ChatSupp(props) {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userInfo = props.user;
  

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }

    if (!socket) {
        const sk = socketServer
        setSocket(sk);
      sk.emit('connected', {
        id: userInfo.id,
        name:  userInfo.permission === 'admin' ? 'Admin' : userInfo.name + ' ' + userInfo.lastName,
        isAdmin: userInfo.permission === 'admin' ? true : false,
      });
      sk.on('message', (data) => {
        if (allSelectedUser.id === data.id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user.id === data.id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user.id === existUser.id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on('updateUser', (updatedUser) => {
        const existUser = allUsers.find((user) => user.id === updatedUser.id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
          user.id === existUser.id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on('listUsers', (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on('selectUser', (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x.id === user.id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
      x.id === existUser.id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit('onUserSelected', user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Por favor escriba un mensaje.');
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name:  userInfo.permission === 'admin' ? 'Admin' : userInfo.name + ' ' + userInfo.lastName },
      ];
      setMessages(allMessages);
      setMessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name:  userInfo.permission === 'admin' ? 'Admin' : userInfo.name + ' ' + userInfo.lastName,
          isAdmin: userInfo.permission === 'admin' ? true : false,
          id: selectedUser.id,
        });
      }, 1000);
    }
  };

  return (
    <div className="chatBody">
      <Row  className="support-container">
          <Col  xs='12' md='12' xl='3' className="chatlist">
            {users.filter((x) => x.id !== userInfo.id).length === 0 ? (
              <MessageBox>No hay usuarios Online</MessageBox>
            ):(<div className="chatlist-heading">
                <h5 className='chatlist-h5'> Seleccione un usuario </h5>
              </div>)
            }
            <ul className="chatlist-items">
              {users
                .filter((x) => x.id !== userInfo.id)
                .map((user) => (
                  <li style={{ animationDelay: `0.2s` }}
                    key={user.id}
                    className={user.id === selectedUser.id ? `chatlist-item active ` : 'chatlist-item'}
                  >
                    <button
                      className="block"
                      type="button"
                      onClick={() => selectUser(user)}
                    >
                      {user.name}
                    </button>
                    <div className="support-users">
                      <span
                          className={
                            user.unread ? 'unread' : user.online ? 'online' : 'offline'
                          }
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </Col>
          <Col  xs='12' md='12' xl='9' className="chatcontent">
            {!selectedUser.id ? (
              <MessageBox>Seleccione un usuario para iniciar el chat</MessageBox>
            ) : (
              <div>
                <div className="content-header">
                  <strong className="current-chatting-user"><h3>Chat con {selectedUser.name}</h3></strong>
                </div>
                <ul ref={uiMessagesRef} className="content-body">
                  {messages.length === 0 && <li>No message.</li>}
                  <div className="chat-items">
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <div style={{ animationDelay: `0.8s` }}
                        className={`chat-item ${msg.name === 'Admin' ? "me" : "other"}`}>
                        <div className="chat-item-content">
                          <strong>{`${msg.name}: `}</strong>
                          <div className="chat-msg"> {msg.body} </div>
                        </div>
                      </div>
                    </li>
                  ))}</div>
                </ul>
                <div className="content-footer">
                  <form onSubmit={submitHandler} className="sendNewMessage">
                    <input
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      type="text"
                      placeholder="type message"
                    />
                    <button className="btnSendMsg" id="sendMsgBtn" type="submit">
                      <i className="fa fa-paper-plane">Enviar</i>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </Col>
      </Row>
    </div>
  );
}
export default ChatSupp;