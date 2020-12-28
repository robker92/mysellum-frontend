import store from "../store";
import {
    i18n
} from "../main";

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, fctName) {
    console.log(error.response);
    if (
        error.response.status === 401 &&
        error.response.data.error === "TokenInvalid"
    ) {
        //console.log(store);
        store.dispatch("account/logout");
        showErrorSnackbar(i18n.t("general.invalidTokenError"));
        return;
    } else {
        // Switch to identify correct error message
        switch (fctName) {
            case "addProduct":
                showErrorSnackbar("Error while adding product.");
                break;

            case "removeProduct":
                showErrorSnackbar("Error while removing product.");
                break;

            default:
                showErrorSnackbar("We are sorry, an error occurred.");
                break;
        }
        return;
    }
}

function showErrorSnackbar(message) {
    store.dispatch(
        "snackbar/addErrorSnackbar",
        message
        //i18n.t("general.invalidTokenError")
    );
}