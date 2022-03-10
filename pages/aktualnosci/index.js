import { getCollection } from '../../firebase/getCollection';
import News from '../../components/createNews/News';

const aktualnosci = ({ news }) => {
  return (
    <div className="news-container">
      {news &&
        JSON.parse(news).map((singleNews) => (
          <News
            key={singleNews.id}
            imgUrl={singleNews.imgUrl}
            dueDate={singleNews.dueDate}
            title={singleNews.title}
            content={singleNews.content}
            id={singleNews.id}
          />
        ))}

      {JSON.parse(news).length === 0 && <p>Brak aktualności!</p>}
    </div>
  );
};

export const getStaticProps = async () => {
  const news = await getCollection('news', null, ['createdAt', 'desc']);

  return {
    props: {
      news: JSON.stringify(news),
    },
    revalidate: 5,
  };
};

export default aktualnosci;
