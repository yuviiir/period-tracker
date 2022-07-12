import axios from "axios";

axios.defaults.crossDomain = true;

let path;
let config;

if (window.location.href.indexOf("localhost") > -1) {
    path = "http://localhost:3000";
}
else {
    path = "/api";
}

config = {
    allEvents: (jwt) =>
      axios({
        method: "GET",
        url: `${path}/cycle/all`,
        headers: {
            "token": jwt
        }
      }),
    allJournalEntries: (jwt) =>
      axios({
        method: "GET",
        url: `${path}/journal`,
        headers: {
            "token": jwt
        }
      }),
    addJournalEntry: (payload, jwt) =>
      axios({
        method: "POST",
        url: `${path}/journal`,
        headers: {
            "token": jwt
        },
        data: payload
      }),
    updateJournalEntry: (payload, jwt) =>
      axios({
        method: "PATCH",
        url: `${path}/journal`,
        headers: {
            "token": jwt
        },
        data: payload
      }),
}

export default config;