import { createContext, useState } from 'react';

export const PopupCtx = createContext();

const PopupCtxProvider = ({ children }) => {
  const [showPopup, toggleShowPopup] = useState(false);
  const [popupItem, setPopupItem] = useState(null);

  const togglePopup = (item) => {
    toggleShowPopup((prev) => !prev);
    setPopupItem(item);
  };

  return (
    <PopupCtx.Provider value={{ showPopup, popupItem, togglePopup }}>
      {children}
    </PopupCtx.Provider>
  );
};

export default PopupCtxProvider;
