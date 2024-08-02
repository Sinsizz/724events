import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Récupération des données depuis le contexte
  const { data } = useData();
  // État local pour suivre l'index de la carte actuellement affichée
  const [index, setIndex] = useState(0);
  
  // Tri des événements focus par date décroissante
  // Correction : Utilisation de la soustraction de dates pour un tri correct
  // Avant : new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  // Cela garantit que les événements les plus récents apparaissent en premier
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Fonction pour passer à la carte suivante
  // Amélioration : Utilisation de la fonction de mise à jour de l'état pour éviter les problèmes de fermeture
  // et vérification de la longueur de byDateDesc pour éviter les erreurs
  const nextCard = () => {
    setIndex(prevIndex => 
      // eslint-disable-next-line no-unsafe-optional-chaining
      prevIndex < (byDateDesc?.length - 1) ? prevIndex + 1 : 0
    );
  };

  // Effet pour gérer le défilement automatique des cartes
  // Amélioration : Ajout d'un nettoyage du timer pour éviter les fuites de mémoire
  // et les comportements inattendus lors des re-rendus
  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    // Fonction de nettoyage pour annuler le timer si le composant est démonté
    return () => clearTimeout(timer);
  }, [index, byDateDesc]); // Dépendances ajoutées pour s'assurer que l'effet se met à jour correctement

  // Vérification de sécurité pour s'assurer que byDateDesc existe et n'est pas vide
  // Cela évite les erreurs de rendu si les données ne sont pas encore chargées
  if (!byDateDesc || byDateDesc.length === 0) {
    return null;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        // Correction : Ajout d'une clé unique pour chaque élément de la liste
        // Cela aide React à identifier quels éléments ont changé, été ajoutés ou supprimés
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            {/* Amélioration : Utilisation du titre de l'événement comme texte alternatif
                pour une meilleure accessibilité */}
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
      {/* Déplacement : La pagination est maintenant en dehors de la boucle map principale
          pour éviter la duplication inutile d'éléments */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => (
            <input
              // eslint-disable-next-line react/no-array-index-key
              key={`radio-${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // Ajout : readOnly pour éviter l'avertissement React sur les inputs contrôlés sans onChange
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
