export function errorTranslation(errorMessage, locale) {
  const defaultError =
    "An error occurred, we are sorry. If the error consists please get in contact with our customer service.";

  if (SUPPORTED_LOCALES.indexOf(locale) === -1) {
    // Locale not supported
    return defaultError;
  }

  if (!(errorMessage in ERROR_LIST)) {
    // Error code not in list
    return ERROR_LIST["DEFAULT"][locale];
  }

  if (!(locale in ERROR_LIST[errorMessage])) {
    // Locale not in error obj
    return ERROR_LIST["DEFAULT"]["en"];
  }

  return ERROR_LIST[errorMessage][locale];
}

const SUPPORTED_LOCALES = ["de", "en"];

const ERROR_LIST = {
  DEFAULT: {
    de: "Es ist ein Fehler aufgetreten, es tut uns leid. Wenn der Fehler weiterhin besteht, wenden Sie sich bitte an unseren Kundendienst.",
    en: "An error occurred, we are sorry. If the error consists please get in contact with our customer service.",
  },

  // ############################
  // AUTH
  // ############################
  AUTH_WRONG_CREDENTIALS: {
    de: "Die Kombination aus Benutzername und Passwort war falsch.",
    en: "Combination of username and password was incorrect.",
  },
  EMAIL_NOT_VERIFIED: {
    de: "Die angegebene E-Mail wurde noch nicht verifiziert.",
    en: "The specified email has not yet been verified.",
  },
  USER_BLOCKED_OR_DELETED: {
    de:
      "Der User zur angegebenen E-Mail Adresse ist blockiert oder gelöscht. Kontaktieren Sie den Support für weitere Details.",
    en: "The user for the specified email address is blocked or deleted. Contact support for more details.",
  },
  EMAIL_ALREADY_USED: {
    de: "Die angegebene E-Mail Adresse ist bereits in gebrauch.",
    en: "The provided e-mail is already in use.",
  },
  // REGISTRATION_UNSUCCESSFUL: {
  //   de: "Die Registrierung war leider nicht erfolgreich. Bitte versuchen Sie es später noch einmal oder kontaktieren Sie unseren Support.",
  //   en: "Unfortunately, the registration was not successful. Please try again later or contact our support.",
  // },
  // EMAIL_VERIFICATION_FAILED: {
  //   de: "Die Verifikation war leider nicht erfolgreich. Sie können eine neue Verifikationsmail anfordern oder unseren Support kontaktieren.",
  //   en: "Unfortunately, the verification was not successful. You can request a new verification email or contact our support.",
  // },
  USER_NOT_FOUND: {
    de: "Leider konnte die eingegebene Benutzeradresse nicht gefunden werden.",
    en: "Unfortunately, the provided email address could not be found.",
  },
  EMAIL_ALREADY_VERIFIED: {
    de: "Die angegebene E-Mail-Adresse wurde bereits verifiziert.",
    en: "The provided email address has been verified already.",
  },
  // EMAIL_VERIFICATION_UNSUCCESSFUL: {
  //   de: "Leider war die Verifizierung der angegebenen E-Mail nicht erfolgreich.",
  //   en: "Unfortunately, the verification of the provided email was unsuccessful.",
  // },

  // ############################
  // SHOPPING CART
  // ############################
  WRONG_STORE_ID_PROVIDED: {
    de: "Es scheint etwas schief gelaufen zu sein, das Produkt konnte deinem Warenkorb nicht hinzugefügt werden.",
    en: "Something seems to have gone wrong, the product could not be added to your shopping cart.",
  },
  WRONG_PRODUCT_ID_PROVIDED: {
    de: "Es scheint etwas schief gelaufen zu sein, das Produkt konnte deinem Warenkorb nicht hinzugefügt werden.",
    en: "Something seems to have gone wrong, the product could not be added to your shopping cart.",
  },
  PRODUCT_NOT_FOUND_IN_CART: {
    de: "Es scheint etwas schief gelaufen zu sein, das Produkt konnte nicht aus deinem Warenkorb entfernt werden.",
    en: "Something seems to have gone wrong, the product could not be removed from your shopping cart.",
  },
};
