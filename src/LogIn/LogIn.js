import React from 'react';

import logInStyle from './LogIn.module.css';

const LogIn = (props) => {
  return (
    <section className={logInStyle.auth}>
      <form action="#" name="login" onSubmit={props.onSubmit}>
        <fieldset>
          <legend>Welcome to RSS Chat</legend>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" autoComplete="off" autoFocus />
          </p>
        </fieldset>
        <input type="submit" value="Enter chat" />
      </form>
    </section>
  )
}

export default LogIn;