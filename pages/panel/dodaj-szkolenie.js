import PanelLayout from '../../components/panel/PanelLayout';
import CreateTraining from '../../components/training/CreateTraining';
import { useAdminRedirect } from '../../firebase-client/useAdminRedirect';
import { useRedirect } from '../../firebase-client/useRedirect';

const AddTraining = () => {
  useAdminRedirect();
  useRedirect();

  return (
    <PanelLayout>
      <CreateTraining />
    </PanelLayout>
  );
};

export default AddTraining;
