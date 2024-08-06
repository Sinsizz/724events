// Objet MONTHS modifié pour correspondre à l'indexation des mois en JavaScript
export const MONTHS = {
  0: "janvier",   // Changé de 1 à 0 pour janvier
  1: "février",   // Changé de 2 à 1 pour février
  2: "mars",      // Changé de 3 à 2 pour mars
  3: "avril",     // Changé de 4 à 3 pour avril
  4: "mai",       // Changé de 5 à 4 pour mai
  5: "juin",      // Changé de 6 à 5 pour juin
  6: "juillet",   // Changé de 7 à 6 pour juillet
  7: "août",      // Changé de 8 à 7 pour août
  8: "septembre", // Changé de 9 à 8 pour septembre
  9: "octobre",   // Changé de 10 à 9 pour octobre
  10: "novembre", // Changé de 11 à 10 pour novembre
  11: "décembre", // Changé de 12 à 11 pour décembre
};

// La fonction getMonth reste inchangée
export const getMonth = (date) => MONTHS[date.getMonth()];

// Explication des changements :
// 1. Nous avons modifié les clés de l'objet MONTHS pour qu'elles correspondent
//    à l'indexation des mois utilisée par JavaScript (0-11 au lieu de 1-12).
// 2. Cela permet à la fonction getMonth de fonctionner correctement sans modification,
//    car date.getMonth() renvoie un nombre de 0 à 11.
// 3. Cette modification assure que janvier (index 0) renvoie "janvier",
//    février (index 1) renvoie "février", et ainsi de suite.
// 4. Cette approche est plus cohérente avec la manière dont JavaScript gère les mois,
//    ce qui peut prévenir des confusions futures et des erreurs potentielles.
