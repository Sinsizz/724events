import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Simulation d'un appel API avec un délai de 500ms
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  // État pour gérer l'envoi du formulaire (inchangé)
  const [sending, setSending] = useState(false);

  // Fonction de soumission du formulaire (modifiée)
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        // MODIFICATION : Ajout de l'appel à onSuccess
        // Cette ligne était manquante, ce qui causait l'échec du test
        onSuccess(); // Appelle la fonction de succès après une soumission réussie
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    // MODIFICATION : Ajout de onSuccess et onError dans les dépendances
    // Cela assure que sendContact sera mis à jour si ces props changent
    [onSuccess, onError]
  );

  // Le reste du composant est inchangé
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

// PropTypes et defaultProps sont inchangés
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
