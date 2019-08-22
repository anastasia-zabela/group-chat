import React from 'react';

import LogIn from './LogIn/LogIn';
import Chat from './Chat/Chat';
import Header from './Header/Header';
import sendNotification from './Notification/notification';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: localStorage.getItem('username') || null,
      connected: false,
      messages: [],
      activeTab: null,
    };

    this.socket = new WebSocket("wss://wssproxy.herokuapp.com/");
    console.log(this.socket.readyState);
    this.socket.onopen = () => {
      this.setState({ connected: true });
      console.log('open', this.socket.readyState);
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

  getUserName(e) {
    const nameInput = e.target.children[1].children[1];
    const userName = nameInput.value || 'User';
    this.setState({ userName: userName });
    localStorage.setItem('username', userName);
    return false;
  }

  changeUserName() {
    this.setState({ userName: null });
  }

  sendMessage(e) {
    if (e.key === 'Enter') {
      let message = e.target.value;
      this.socket.send(JSON.stringify({ from: this.state.userName, message: message }));
      e.target.value = '';
      console.log('message', this.socket.readyState, message);
    }
  }

  enterChat() {
    this.socket = new WebSocket("ws://st-chat.shas.tel");
    this.socket.onopen = () => {
      this.setState({ connected: true });
    };
    console.log('enter', this.socket.readyState);
    this.socket.onmessage = (event) => {
      let messagesHistory = this.state.messages;
      const newMessage = JSON.parse(event.data).reverse();
      this.setState({ messages: messagesHistory.concat(newMessage) });
    };
  }

  closeChat() {
    this.socket.close();
    this.setState({ connected: false });
    console.log('close', this.socket.readyState);
  }

  render() {
    let content;
    if (this.state.userName === null) {
      content = <LogIn onSubmit={this.getUserName}/>;
    } else {
      content = <Chat connected={this.state.connected} messages={this.state.messages} onKeyDown={this.sendMessage} />
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
