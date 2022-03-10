import Review from './Review';

const Reviews = ({ items }) => {
  return (
    <>
      <div className="zakres1">
        <div className="zakres-txt">Opinie naszych klientów</div>
      </div>

      {items.map((item) => (
        <Review item={item} key={item.id} />
      ))}
    </>
  );
};

export default Reviews;
