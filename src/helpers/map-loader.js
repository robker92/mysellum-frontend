import {
    Loader
} from "google-maps";

const loader = new Loader("AIzaSyAbBngkySn9wEK5O9EZ31jUaGKe6jsg56M");
// eslint-disable-next-line no-unused-vars
var google;

export async function setLoader() {
    google = loader.load();
}

export function getGoogleMapLoader() {
    //const google = await loader.load();
    return google;
}