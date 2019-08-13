import React from 'react';

class Chat extends React.Component {
  render() {
    return (
      <section>
        <div id="content"></div>
        <div>
          <span id="status">Connecting...</span>
          <input type="text" id="input" disabled="disabled" />
        </div>
      </section>
    )
  }
}

export default Chat;