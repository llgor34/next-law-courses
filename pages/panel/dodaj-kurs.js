import PanelLayout from '../../components/panel/PanelLayout';
import AddCourse from '../../components/course/AddCourse';
import { useAdminRedirect } from '../../firebase-client/useAdminRedirect';
import { useRedirect } from '../../firebase-client/useRedirect';

const AddCoursePage = () => {
  useAdminRedirect();
  useRedirect();

  return (
    <PanelLayout>
      <AddCourse />
    </PanelLayout>
  );
};

export default AddCoursePage;
