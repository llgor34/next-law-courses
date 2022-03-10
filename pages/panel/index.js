import PanelLayout from '../../components/panel/PanelLayout';
import Courses from '../../components/course/Courses';
import { getCollection } from '../../firebase/getCollection';
import { useRedirect } from '../../firebase-client/useRedirect';

const Panel = ({ courses: coursesJSON }) => {
  const courses = JSON.parse(coursesJSON);
  useRedirect();

  return (
    <PanelLayout>
      <Courses courses={courses} />
    </PanelLayout>
  );
};

export default Panel;

export const getStaticProps = async () => {
  const courses = await getCollection('courses', null, ['createdAt', 'desc']);

  return {
    props: {
      courses: JSON.stringify(courses),
    },
    revalidate: 5,
  };
};
