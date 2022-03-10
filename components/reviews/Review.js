import StarRating from '../starrating/StarRating';
import { formatDistanceToNow } from 'date-fns';

const Review = ({ item }) => {
  return (
    <div className="opinie">
      <div className="top-opinie">
        <div className="opinie-name">{item.author}
          <div className="opinie-gwiazdki">
            <StarRating stars={item.rating} />
          </div>
        </div>
        
        <div className="opinie-createdat">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
        </div>
      </div>
      <div className="txt"> <q> {item.content} </q> </div>
    </div>
  );
};

export default Review;
