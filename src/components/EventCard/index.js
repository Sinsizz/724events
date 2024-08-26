import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// EventCard avec destructuration des props
const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(), // Valeur par défaut pour date si non fournie
  title,
  label,
  small = false, // Contrôle la taille de la carte (normale ou petite)
  ...props // Capture les props supplémentaires non spécifiées
}) => (
    <div
      data-testid="card-testid" // Attribut pour les tests
      // Applique une classe conditionnelle basée sur la prop 'small'
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props} // Spread des props supplémentaires
    >
      <div className="EventCard__imageContainer">
        {/* Affichage de l'image de l'événement */}
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        {/* Label de l'événement positionné sur l'image */}
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        {/* Titre de l'événement */}
        <div className="EventCard__title">{title}</div>
        {/* Affichage du mois de l'événement, formaté par getMonth */}
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

// Définition des types de props attendus par le composant
EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired, // URL de l'image, obligatoire
  imageAlt: PropTypes.string, // Texte alternatif de l'image, optionnel
  date: PropTypes.instanceOf(Date).isRequired, // Date de l'événement, doit être un objet Date
  title: PropTypes.string.isRequired, // Titre de l'événement, obligatoire
  small: PropTypes.bool, // Contrôle la taille de la carte, optionnel
  label: PropTypes.string.isRequired, // Label de l'événement, obligatoire
};

// Valeurs par défaut pour certaines props
EventCard.defaultProps = {
  imageAlt: "image", // Texte alternatif par défaut si non fourni
  small: false, // Par défaut, la carte n'est pas en mode "small"
}

export default EventCard;
