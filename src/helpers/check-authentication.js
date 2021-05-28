import store from "../store";
import { i18n } from "../main";

export function checkAuthentication(error) {
  console.log(error.response);
  if (
    error.response.status === 401 &&
    error.response.data.error === "TokenInvalid"
  ) {
    //console.log(store);
    store.dispatch("account/logout");
    store.dispatch(
      "snackbar/addErrorSnackbar",
      //"We are sorry, your session has run out. Please login again."
      i18n.t("general.invalidTokenError")
    );
    return false;
  } else {
    return true;
  }
}
