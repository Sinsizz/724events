import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// EventCard avec destructuration des props
const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(), 
  title,
  label,
  small = false, // Contrôle la taille de la carte (normale ou petite)
  ...props // Capture les props supplémentaires non spécifiées
}) => (
    <div
      data-testid="card-testid"
      // Applique une classe conditionnelle basée sur la prop 'small'
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

// Définition des types de props attendus par le composant
EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

// Valeurs par défaut pour certaines props
EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
