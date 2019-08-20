import React, { useState } from 'react';

import headerStyle from './Header.module.css';

const Header = ({ userName, status, changeUserName, enterChat, closeChat }) => {
  const [showMenu, setShowMenu] = useState(false);
  const displayUserName = {
    display: userName ? 'inline-block' : 'none',
  }
  const bgStatus = {
    background: status ? '#3dd381' : '#d3593d',
  }
  const displayMenu = {
    display: showMenu ? 'inline-block' : 'none',
  }

  function showDropDownMenu() {
    setShowMenu(!showMenu);
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && showMenu) {
      console.log(e.target.tagName)
      setShowMenu(!showMenu);
    }
  })

  let button;
  if (status) {
    button = (
      <button onClick={closeChat}>Exit chat</button>
    )
  } else if (!status) {
    button = (
      <button onClick={enterChat}>Enter chat</button>
    )
  }

  return (
    <header className={headerStyle.header}>
      <nav>
        <h1>Rolling Scopes School Chat</h1>
        <ul className={headerStyle.info}>
          <li className={headerStyle.status} style={bgStatus}>{status ? 'Connected' : 'Connecting...'}</li>
          <li className={headerStyle.name} style={displayUserName}>
            <button onClick={showDropDownMenu}>{`${userName}`}</button>
            <ul className={headerStyle.nameMenu} style={displayMenu}>
              <li>
                <button onClick={changeUserName}>Change name</button> 
              </li>
              <li>
                {button}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
