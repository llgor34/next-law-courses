import Training from '../../components/training/Training';
import { getCollection } from '../../firebase/getCollection';

const Trainings = ({ trainings }) => {
  return (
    <div className="training-container">
      {trainings &&
        JSON.parse(trainings).map((training) => (
          <Training
            key={training.id}
            title={training.title}
            date={training.dueDate}
            imgUrl={training.imgUrl}
            id={training.id}
          />
        ))}

      {JSON.parse(trainings).length === 0 && <p>Brak szkoleń</p>}
    </div>
  );
};

export default Trainings;

export const getStaticProps = async () => {
  const trainings = await getCollection('trainings', null, [
    'createdAt',
    'desc',
  ]);

  return {
    props: {
      trainings: JSON.stringify(trainings),
    },
    revalidate: 5,
  };
};
