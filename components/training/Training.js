import { useDoc } from '../../firebase-client/useDoc';
import { useAdmin } from '../../firebase-client/useAdmin';
import { ToastContainer, toast } from 'react-nextjs-toast';

const TrainingShort = ({ title, date, imgUrl, id }) => {
  const { delDoc } = useDoc('trainings');
  const { isAdmin } = useAdmin();

  const handleDocDelete = async () => {
    await delDoc(id);

    toast.notify('Aktualizacja szkoleń może zająć kilka minut!', {
      duration: 3,
      type: 'success',
      title: 'Usunięto szkolenie!',
    });
  };

  return (
    <div className="training-alert">
      <ToastContainer align="center" position="bottom" />
      <img className="training-img" src={imgUrl} />
      
      <div className="training-messages">
        <span className="training-date">{date}</span>
        <span className="training-title">{title}</span>
      </div>
      {isAdmin && <button className="training-btn-del" onClick={handleDocDelete}>Usuń</button>}
      
    </div>
  );
};

export default TrainingShort;
