const serverMessage = (res, key, data = []) => {
  let error = false;
  let status = 500;
  let message = key;

  switch (key) {
    // Erreurs client (4xx)
    case "ACCOUNT_ALREADY_EXISTS":
    case "INVALID_CREDENTIALS":
    case "BAD_REQUEST":
    case "REQUIRED_FIELDS_MISSING":
    case "INVALID_EMAIL_FORMAT":
    case "PASSWORDS_DO_NOT_MATCH":
    case "OLD_PASSWORD_INVALID":
    case "INVALID_PHONE_NUMBER":
    case "PHONE_ALREADY_EXISTS":
    case "FILE_TOO_LARGE":
    case "UNSUPPORTED_FILE_TYPE":
    case "FILE_UPLOAD_FAILED":
    case "FILE_DOWNLOAD_FAILED":
    case "PASSWORD_CHANGE_FAILED":
    case "ENRICHMENT_FAILED":
    case "METHOD_NOT_ALLOWED":
      error = true;
      status = 400; // Bad Request
      break;

    // Erreurs liées à l'authentification et à l'autorisation
    case "UNAUTHORIZED_ACCESS":
    case "TOKEN_EXPIRED":
    case "TOKEN_INVALID":
    case "ACCOUNT_BLOKED":
    case "ENRICH_SOURCE_IS_EMPTY":
      error = true;
      status = 401; // Unauthorized - L'accès est refusé en raison de l'absence ou d'une invalidité de l'authentification
      break;

    // Erreur d'accès interdit (authentifié mais sans permission)
    case "ACCESS_DENIED":
    case "INSUFFICIENT_PERMISSIONS":
    case "FORBIDDEN_RESOURCE":
    case "ACCOUNT_ARCHIVED":
    case "ACCOUNT_UNVERIFIED":
    case "OTP_SENDING_FAILED":
    case "OTP_INVALID_ORR_EXPIRED":
    case " RESOURCE_CONFLICT":
      error = true;
      status = 403; // Forbidden - Le serveur comprend la requête mais refuse de l'exécuter
      break;

    //Erreur de ressource verrouillée
    case "ACCOUNT_LOCKED":
      error = true;
      status = 423; // Locked - La ressource est verrouillée et ne peut être modifiée
      break;

    // Erreur lies a trop de tentatives de connexion
    case "TOO_MANY_ATTEMPTS":
      error = true;
      status = 429; // Too Many Requests - Trop de requêtes envoyées dans un court laps de temps
      break;

    // Erreurs serveur (5xx)
    case "SERVER_ERROR":
    case "FAILED_TO_GET_JOB":
      error = true;
      status = 500; // Internal Server Error
      break;

    // Succès (2xx) - Création de ressources : Réponses avec un code 201
    case "ACCOUNT_CREATED":
    case "USER_CREATED":
    case "PROFILE_CREATED":
    case "SESSION_CREATED":
    case "JOB_CREATED":
    case "SESSION_REGENERATED":
    case "GUEST_SESSION_CREATED":
    case "REGISTER_SUCCESS":
      status = 201; // Created - La ressource a été créée avec succès
      break;

    // Autres succès (2xx) - réponses générales pour actions réussies
    case "SUCCESS":
    case "NEXT_STEP":
    case "LOGIN_SUCCESS":
    case "LOGOUT_SUCCESS":
    case "USER_UPDATED":
    case "USER_DELETED":
    case "PROFILE_UPDATED":
    case "SESSION_TERMINATED":
    case "EMAIL_VERIFICATION_SENT":
    case "EMAIL_VERIFIED_SUCCESS":
    case "PASSWORD_RESET_REQUESTED":
    case "PASSWORD_RESET_SUCCESS":
    case "ACCOUNT_REACTIVATED":
    case "DATA_FETCH_SUCCESS":
    case "FILE_UPLOAD_SUCCESS":
    case "FILE_DELETED":
    case "FILE_DOWNLOAD_SUCCESS":
    case "PASSWORD_CHANGED":
    case "OTP_SENT":
    case "OTP_VERIFIED":
    case "JOB_FETCHED":
    case "JOB_UPDATED":
    case "JOB_DELETED":
    case "RESOURCE_HAS_BEEN_DELETED_SUCCESSFULLY":
    case "ENRICH_CREATED":
      status = 200; // OK (successful operation)
      break;

    // Erreurs liées à la gestion des ressources et à l'action
    case "RESOURCE_NOT_FOUND":
    case "NO_JOBS_FOUND":
    case "NO_DATA_FOUND":
    case "JOB_NOT_FOUND":
    case "ACTION_NOT_ALLOWED":
    case "PROFILE_NOT_FOUND":
    case "ACCOUNT_NOT_FOUND":
    case "FILE_NOT_FOUND":
      error = true;
      status = 404; // Not Found
      break;

    // Erreurs génériques de serveur si le cas n'est pas couvert ci-dessus
    default:
      error = true;
      status = 500; // Internal Server Error
      message = "UNKNOWN_ERROR"; // Code non défini
  }

  if (res) return res.status(status).json({ error, status, message, data });
  else return { error, status, message, data };
};

export default serverMessage;
