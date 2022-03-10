import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import HtmlParser from 'react-html-parser';

import { useContext } from 'react';
import { PopupCtx } from '../contexts/popupCtx/PopupCtx';

const Popup = ({ onClick: closePopup }) => {
  const { popupItem } = useContext(PopupCtx);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const removeHTMLTags = (string) => {
    const regex = /(<([^>]+)>)/gi;
    return string.replace(regex, '');
  };

  return (
    <AnimatePresence>
      <motion.div
        id="czarny"
        className="popupik"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={closePopup}
      >
        <div id="popup" className="popupik" onClick={stopPropagation}>
          <div className="popuptop">
            <div className="popup-title" id="titlepop">
              {popupItem && removeHTMLTags(popupItem.title)}
            </div>
            <a className="popup-close" onClick={closePopup}>
              <AiOutlineClose size="30px" />
            </a>
          </div>
          <div className="popup-content" id="contentpop">
            {popupItem && HtmlParser(popupItem.content)}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Popup;
