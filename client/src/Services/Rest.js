import axios from "axios";

axios.defaults.crossDomain = true;

let path;
let config;

path = "/api";

config = {
    cycle: (jwt) =>
      axios({
        method: "GET",
        url: `${path}/cycle`,
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