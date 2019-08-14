import React from 'react';

import Message from '../Message/Message';
import chatStyle from './Chat.module.css';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recivedMessages: this.props.messages,
      renderedMessages: [],
    }
  }

  UNSAFE_componentWillMount() {
    const messages = [];
    this.state.recivedMessages.forEach(message => {
      messages.push(
        <Message key={message.id} name={message.from} text={message.message} date={message.time} />
      )
    });
    this.setState({ renderedMessages: messages });
    // console.log(messages);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('i`m work', nextProps.messages.length)
    // console.log('nextprops', nextProps.messages)
    this.setState({ recivedMessages: nextProps.messages });
    const messages = [];
    // console.log('recived', this.state.recivedMessages)
    nextProps.messages.forEach(message => {
      messages.push(
        <Message key={message.id} name={message.from} text={message.message} date={message.time} />
      )
    });
    this.setState({ renderedMessages: messages });
  }

  UNSAFE_componentDidMount() {
    const content = document.getElementById('content');
    content.scrollTop = content.scrollHeight;
  }

  componentDidUpdate() {
    const content = document.getElementById('content');
    content.scrollTop = content.scrollHeight;
  }

  render() {
    // console.log('props', this.props.messages)
    let status = this.props.connected ? 'Connected' : 'Connecting...';
    // console.log( 'this.state', this.state.recivedMessages)
    // console.log('rendered', this.state.renderedMessages)

    return (
      <section className={chatStyle.chatContainer}>
        <div className={chatStyle.content} id="content">
          {this.state.renderedMessages}
        </div>
        <div>
          <span className={chatStyle.status}>{status}</span>
          <input type="text" className={chatStyle.input} onKeyDown={this.props.onKeyDown} disabled={!this.props.connected} />
        </div>
      </section>
    )
  }
}

export default Chat;