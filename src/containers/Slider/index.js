import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  // Tri des événements focus par date décroissante
  // Cela garantit que les événements les plus récents apparaissent en premier
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setIndex(prevIndex => 
      // eslint-disable-next-line no-unsafe-optional-chaining
      prevIndex < (byDateDesc?.length - 1) ? prevIndex + 1 : 0
    );
  };

  // Effet pour gérer le défilement automatique des cartes
  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);

  if (!byDateDesc || byDateDesc.length === 0) {
    return null;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => (
            <input
              // eslint-disable-next-line react/no-array-index-key
              key={`radio-${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
