import { AiFillStar } from 'react-icons/ai';

const StarRating = ({ stars }) => {
  switch (parseInt(stars)) {
    case 0:
      return (
        <div>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 1:
      return (
        <div>
          <AiFillStar color="#fcba03" />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 2:
      return (
        <div>
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 3:
      return (
        <div>
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar />
          <AiFillStar />
        </div>
      );
    case 4:
      return (
        <div>
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar />
        </div>
      );
    case 5:
      return (
        <div>
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
          <AiFillStar color="#fcba03" />
        </div>
      );
  }
};

export default StarRating;
