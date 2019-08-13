import React from 'react';

import LogIn from './LogIn/LogIn';
import Chat from './Chat/Chat';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    };

    this.getUserName = this.getUserName.bind(this);
  }

  getUserName(e) {
    this.setState({ userName: e.target.value })
  }

  render() {
    let content;
    if (this.state.userName === null) {
      content = <LogIn onClick={this.getUserName} />;
    } else {
      content = <Chat />
    }

    return <div>{content}</div>;
  }
}

export default ChatApp;
