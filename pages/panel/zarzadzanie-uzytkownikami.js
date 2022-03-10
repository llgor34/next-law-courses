import PanelLayout from '../../components/panel/PanelLayout';
import { useRedirect } from '../../firebase-client/useRedirect';
import { useAdminRedirect } from '../../firebase-client/useAdminRedirect';
import ManageUsers from '../../components/manageUsers/ManageUsers';

const ManageUsersPage = () => {
  useAdminRedirect();
  useRedirect();

  return (
    <PanelLayout>
      <ManageUsers />
    </PanelLayout>
  );
};

export default ManageUsersPage;
