import { useEffect, useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { getMonth } from '../../helpers/Date';

import './style.scss';

const Slider = () => {
  const imagesPath = `${process.env.PUBLIC_URL}`;
  const { data } = useData();
  const [index, setIndex] = useState(1);

  const byDateDesc = data?.focus.sort((evtA, evtB) => {
    return new Date(evtA.date) < new Date(evtB.date) ? -1 : 1;
  });

  const nextCard = () => {
    setTimeout(() => {
      setIndex(index < byDateDesc.length ? index + 1 : 1);
    }, 5000);
  };

  useEffect(() => {
    nextCard();
  }, [nextCard]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map(({ title, cover, description, date, id }) => {
        return (
          <div key={id}>
            <div
              className={`SlideCard SlideCard--${
                index === id ? 'display' : 'hide'
              }`}
            >
              <img src={`${imagesPath}${cover}`} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div>{getMonth(new Date(date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIndex) => {
                  radioIndex++;
                  return (
                    <label key={radioIndex}>
                      <input
                        type="radio"
                        name="radio-button"
                        checked={index === radioIndex}
                        onChange={() => null}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
