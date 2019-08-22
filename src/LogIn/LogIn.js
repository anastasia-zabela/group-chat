import React from 'react';

import logInStyle from './LogIn.module.css';

const LogIn = (props) => {
  return (
    <section className={logInStyle.auth}>
      <form action="#" onSubmit={props.onSubmit}>
          <h4 className={logInStyle.nameForm}>Welcome to RSS Chat</h4>
          <p className={logInStyle.authForm}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" autoComplete="off" maxLength="50" autoFocus />
          </p>
        <input type="submit" value="Enter chat" />
      </form>
    </section>
  )
}

export default LogIn;