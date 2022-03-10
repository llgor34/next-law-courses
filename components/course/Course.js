import HtmlParser from 'react-html-parser';
import { useAuth } from '../../firebase-client/useAuth';
import { useAdmin } from '../../firebase-client/useAdmin';
import { useDoc } from '../../firebase-client/useDoc';
import { ToastContainer, toast } from 'react-nextjs-toast';
import Link from 'next/link';

const Course = ({ course }) => {
  const { description, title, miniatureUrl, price, id } = course;
  const { userDoc } = useAuth();
  const { isAdmin } = useAdmin();
  const { delDoc } = useDoc('courses');

  const handleDocDelete = async () => {
    await delDoc(id);

    toast.notify('Aktualizacja kursów może zająć kilka minut!', {
      duration: 5,
      type: 'success',
      title: 'Usunięto kurs!',
    });
  };

  if (!userDoc) {
    return (
      <div className="kurs">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="kurs">
      <ToastContainer align="center" position="bottom" />

      <div className="thumbnail">
        <img className="zdj-kurs" src={miniatureUrl} />
      </div>
      <div className="tresc">
      <div className="btns">
          {!userDoc.ownedCourses.includes(id) && !isAdmin && (
              <Link href={`/panel/zakup/${id}`}>
                <button className="btn-kurs">KUP</button>
              </Link>
            )}
            {(userDoc.ownedCourses.includes(id) || isAdmin) && (
              <Link href={`/panel/moje-kursy/${id}`}>
                <button className="btn-kurs">Obejrzyj</button>
              </Link>
            )}
            {isAdmin && (
              <button className="btn-kurs" onClick={handleDocDelete}>
                Usuń
              </button>
            )}
          </div>
        <div className="title">{title}</div>
        <div className="description">{HtmlParser(description)}</div>
        <div className="cena">
          <span>Cena: {price} PLN</span>
        </div>
        
      </div>
      
    </div>
  );
};

export default Course;
