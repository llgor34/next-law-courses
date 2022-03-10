import PanelLayout from '../../../components/panel/PanelLayout';
import { useRouter } from 'next/router';
import { useDoc } from '../../../firebase-client/useDoc';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../firebase-client/useAuth';
import { useRedirect } from '../../../firebase-client/useRedirect';

const BuyCourseInformation = () => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { getDoc } = useDoc('courses');
  const { id } = router.query;
  const { user } = useAuth();
  useRedirect();

  useEffect(() => {
    if (id) {
      getDoc(id).then((res) => setCourse(res.data()));
    }
  }, [id]);

  if (!course || !user) {
    return (
      <PanelLayout>
        <div className="kurs-container klasa1">
          <p>Loading...</p>
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout>
      <div className="kurs-container klasa1">
        <h1>Informacje o płatności</h1>
        <div className="platnosc-box">
          <p>Nr konta: 46 1090 2590 0000 0001 4938 1691 </p>
          <p>
            Tytuł przelewu: Zakup kursu ( {course.title} ) dla użytkownika{' '}
            ( {user && user.displayName} )
          </p>
          <p>Kwota: {course.price} PLN</p>
        </div>
      </div>
    </PanelLayout>
  );
};

export default BuyCourseInformation;
