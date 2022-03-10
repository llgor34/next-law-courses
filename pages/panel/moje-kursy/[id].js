import PanelLayout from '../../../components/panel/PanelLayout';
import { useRouter } from 'next/router';
import { useDoc } from '../../../firebase-client/useDoc';
import { useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';

const CourseView = () => {
  const [course, setCourse] = useState(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { getDoc: getCourse } = useDoc('courses');
  const { getDoc: getCourseMovie } = useDoc('movies');

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    getCourse(id + '')
      .then((res) => setCourse(res.data()))
      .catch((error) => setError(error.message));
    getCourseMovie(id + '')
      .then((res) => setMovie(res.data()))
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <PanelLayout>
      {course && movie && (
        <div className="kurs-container">
          <video controls className="kurs-video" controlsList="nodownload">
            <source src={movie.movieUrl} type="video/mp4" />
              Twoja przeglądarka (IE8) nie wspiera odtwarzacza VIDEO
          </video>
          <h2 className="kurs-title">{course.title}</h2>
          <p>{HtmlParser(course.description)}</p>
        </div>
      )}
    </PanelLayout>
  );
};

export default CourseView;