import PanelNavbar from './PanelNavbar';

const PanelLayout = ({ children }) => {
  return (
    <div className="p-container">
      <PanelNavbar />
      <div class="p-content">{children}</div>
    </div>
  );
};

export default PanelLayout;
