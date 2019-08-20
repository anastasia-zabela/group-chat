import React from 'react';

import LogIn from './LogIn/LogIn';
import Chat from './Chat/Chat';
import Header from './Header/Header';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      connected: false,
      messages: [],
    };

    this.socket = new WebSocket("ws://st-chat.shas.tel");
    this.socket.onopen = () => {
      this.setState({ connected: true });
    };
    this.socket.onmessage = (event) => {
      let messagesHistory = this.state.messages;
      const newMessage = JSON.parse(event.data).reverse();
      this.setState({ messages: messagesHistory.concat(newMessage) });
    };

    this.getUserName = this.getUserName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  getUserName(e) {
    const nameInput = e.target.children[1].children[1];
    this.setState({ userName: nameInput.value || 'User' });
    return false;
  }

  sendMessage(e) {
    if (e.key === 'Enter') {
      console.log('user', this.state.userName)
      let message = e.target.value;
      console.log(e.target.value);
      this.socket.send(JSON.stringify({ from: this.state.userName, message: message}));
      e.target.value = '';
    }
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
        <Header userName={this.state.userName} status={this.state.connected}/>
        {content}
      </section>
    );
  }
}

export default ChatApp;
