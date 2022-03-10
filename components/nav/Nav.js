import Navlink from '../navlink/Navlink';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { BsJustify } from 'react-icons/bs';

const Nav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = () => {
    setIsCollapsed(false);
  };

  return (
    <div id="nav" className={`${isCollapsed ? 'collapse' : ''}`}>
      <Navlink href="/nasz-zespol" onClick={handleClick}>
        Nasz zespół
      </Navlink>
      <Navlink href="/" onClick={handleClick}>
        Nasze usługi
      </Navlink>
      <Navlink href="/szkolenia" onClick={handleClick}>
        Szkolenia
      </Navlink>
      <Navlink href="/porady-online" onClick={handleClick}>
        Porady online
      </Navlink>
      <Navlink href="/aktualnosci" onClick={handleClick}>
        Aktualności
      </Navlink>
      <Navlink href="/kontakt" onClick={handleClick}>
        Kontakt
      </Navlink>
      <Navlink href="/zaloguj" onClick={handleClick}>
        <FaUserCircle className="navLogin" />
      </Navlink>
      <button
        className="toggle-nav"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <BsJustify />
      </button>
    </div>
  );
};

export default Nav;
