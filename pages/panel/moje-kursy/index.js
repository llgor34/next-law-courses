import PanelLayout from '../../../components/panel/PanelLayout';
import { useRedirect } from '../../../firebase-client/useRedirect';
import { useAuth } from '../../../firebase-client/useAuth';
import { getCollection } from '../../../firebase/getCollection';
import Courses from '../../../components/course/Courses';

const MyCourses = ({ courses: coursesJSON }) => {
  const courses = JSON.parse(coursesJSON);
  const { userDoc } = useAuth();
  useRedirect();

  if (!userDoc) {
    return (
      <PanelLayout>
        <h1>Moje kursy</h1>
        <p>Loading...</p>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout>
      {courses.length > 0 && (
        <Courses
          courses={courses.filter((course) =>
            userDoc.ownedCourses.includes(course.id)
          )}
        />
      )}
    </PanelLayout>
  );
};

export default MyCourses;

export const getStaticProps = async () => {
  const courses = await getCollection('courses');

  return {
    props: {
      courses: JSON.stringify(courses),
    },
    revalidate: 5,
  };
};
