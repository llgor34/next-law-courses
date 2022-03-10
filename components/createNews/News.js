import ReactHtmlParser from 'react-html-parser';
import { useAdmin } from '../../firebase-client/useAdmin';
import { useDoc } from '../../firebase-client/useDoc';
import { ToastContainer, toast } from 'react-nextjs-toast';

const Training = ({ imgUrl, title, content, dueDate, id }) => {
  const { isAdmin } = useAdmin();
  const { delDoc } = useDoc('news');

  const handleDocDelete = async () => {
    await delDoc(id);

    toast.notify('Aktualizacja aktualności może zająć kilka minut!', {
      duration: 3,
      type: 'success',
      title: 'Usunięto aktualność!',
    });
  };

  return (
    <div className="news-post">
      <ToastContainer align="center" position="bottom" />
      <div className="news-post-img">
        <img src={imgUrl} alt={title}></img>
        <div className="news-post-btn-usun">
          {isAdmin && <button className="btn-usun" onClick={handleDocDelete}>Usuń</button>}
        </div>
      </div>
      <div className="news-post-left">
        <div className="news-post-header">
          <div className="news-post-title">{title}</div>
          <div className="news-post-createdat">{dueDate}</div>
        </div>
        <div className="news-post-desc">{ReactHtmlParser(content)}</div>
      </div>
    </div>
  );
};

export default Training;
