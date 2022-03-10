import Cards from '../components/cards/Cards';
import Motto from '../components/motto/Motto';
import OurServices from '../components/ourservices/Our-services';
import Popup from '../components/popup/Popup';
import Reviews from '../components/reviews/Reviews';
import { getCollection } from '../firebase/getCollection';
import { useContext } from 'react';
import { PopupCtx } from '../components/contexts/popupCtx/PopupCtx';

export default function Home({ items, reviews }) {
  const { showPopup, togglePopup } = useContext(PopupCtx);

  return (
    <>
      {showPopup && <Popup onClick={togglePopup} />}
      <div id="container">
        <Motto />

        <OurServices />
        <Cards items={JSON.parse(items)} />

        <Reviews items={JSON.parse(reviews)} />
      </div>

    </>
  );
}

export async function getStaticProps() {
  const data = await getCollection('services');
  const reviews = await getCollection('reviews', null, ['createdAt', 'desc']);

  return {
    props: {
      items: JSON.stringify(data),
      reviews: JSON.stringify(reviews),
    },
    revalidate: 5,
  };
}
