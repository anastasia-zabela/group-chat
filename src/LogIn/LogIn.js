import React from 'react';

import logInStyle from './LogIn.module.css';

const LogIn = (props) => {
  return (
    <section className={logInStyle.auth}>
      <h3>Enter your name</h3>
      <form>
        <input type="text"/>
        <button onClick={props.onClick} type="submit">Enter chat</button>
      </form>
    </section>
  )
}

export default LogIn;