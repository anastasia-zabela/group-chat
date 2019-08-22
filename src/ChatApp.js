import React from 'react';

import LogIn from './LogIn/LogIn';
import Chat from './Chat/Chat';
import Header from './Header/Header';
import sendNotification from './components/notification';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: localStorage.getItem('username') || null,
      connected: false,
      activeTab: null,
      messages: [],
    };

    this.getSocket();

    Notification.requestPermission();

    window.onfocus = () => {
      this.setState({ activeTab: false });
    }
    window.onblur = () => {
      this.setState({ activeTab: true });
    }

    this.getUserName = this.getUserName.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.enterChat = this.enterChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
  }

  getSocket() {
    this.socket = new WebSocket("wss://wssproxy.herokuapp.com/");
    this.socket.onopen = () => {
      this.setState({ connected: true });
    };
    this.socket.onmessage = (event) => {
      let messagesHistory = this.state.messages;
      const newMessage = JSON.parse(event.data).reverse();
      this.setState({ messages: messagesHistory.concat(newMessage) });
      if (newMessage.length === 1 && this.state.activeTab) {
        sendNotification(newMessage[0].from, {body: newMessage[0].message});
      }
      
    };
    this.socket.onerror = () => {
      this.setState({ connected: false });
    }
  }

  getUserName(e) {
    e.preventDefault();
    const nameInput = e.target.children[1].children[1];
    const userName = nameInput.value || 'User';
    this.setState({ userName: userName });
    localStorage.setItem('username', userName);
  }

  changeUserName() {
    this.setState({ userName: null });
  }

  sendMessage(e) {
    e.preventDefault();
    const message = e.target.children[0].value;
    this.socket.send(JSON.stringify({ from: this.state.userName, message: message }));
    e.target.children[0].value = '';
  }

  enterChat() {
    this.getSocket();
  }

  closeChat() {
    this.socket.close();
    this.setState({ connected: false });
  }

  render() {
    let content;
    if (this.state.userName === null) {
      content = <LogIn onSubmit={this.getUserName}/>;
    } else {
      content = <Chat connected={this.state.connected} messages={this.state.messages} sendMessage={this.sendMessage} />
    }

    return (
      <section>
        <Header userName={this.state.userName} status={this.state.connected} changeUserName={this.changeUserName} enterChat={this.enterChat} closeChat={this.closeChat}/>
        {content}
      </section>
    );
  }
}

export default ChatApp;
