import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

  componentDidMount() {
    const content = document.getElementById('content');
    content.scrollTop = content.scrollHeight;
  }

  componentDidUpdate() {
    const content = document.getElementById('content');
    content.scrollTop = content.scrollHeight;
  }

  render() {
    // console.log('props', this.props.messages)
    // console.log( 'this.state', this.state.recivedMessages)
    // console.log('rendered', this.state.renderedMessages)

    return (
      <section className={chatStyle.chat}>
        <div className={chatStyle.content} id="content">
          {this.state.renderedMessages}
        </div>
        <form action="#" className={chatStyle.sendForm} onSubmit={this.props.sendMessage}>
          <input type="text" className={chatStyle.enterMessage} disabled={!this.props.connected} />
          <button type="submit" className={chatStyle.sendMessage} value="">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </form>
      </section>
    )
  }
}

export default Chat;