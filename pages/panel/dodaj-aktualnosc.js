import PanelLayout from '../../components/panel/PanelLayout';
import CreateNews from '../../components/createNews/CreateNews';
import { useRedirect } from '../../firebase-client/useRedirect';
import { useAdminRedirect } from '../../firebase-client/useAdminRedirect';

const AddCurrentEvents = () => {
  useRedirect();
  useAdminRedirect();

  return (
    <PanelLayout>
      <CreateNews />
    </PanelLayout>
  );
};

export default AddCurrentEvents;
