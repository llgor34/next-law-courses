import Card from './card/Card';

const Cards = ({ items }) => {
  return (
    <div id="cards">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Cards;
