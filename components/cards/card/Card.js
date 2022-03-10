import HtmlParser from 'react-html-parser';
import { useContext } from 'react';
import { PopupCtx } from '../../contexts/popupCtx/PopupCtx';
import { GiInjustice } from 'react-icons/gi';

const Card = ({ item }) => {
  const { togglePopup } = useContext(PopupCtx);

  return (
    <div className="card">
      <div className="circle">
        <GiInjustice color="#fff" className="logocard" />
      </div>
      <div className="tekst">
        <p>{HtmlParser(item.title)}</p>
      </div>
      <a className="learnmore" onClick={() => togglePopup(item)}>
        Dowiedz się więcej
      </a>
    </div>
  );
};

export default Card;
