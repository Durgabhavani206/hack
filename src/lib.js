// lib.js

// Replace localhost with your ngrok URL
export const BASEURL = "https://abcd1234.ngrok-free.app/";

// Utility function for API calls
export function callApi(reqMethod, url, data, responseHandler) {
    let options;
    if (reqMethod === "GET" || reqMethod === "DELETE") {
        options = { method: reqMethod, headers: { 'Content-Type': 'application/json' } };
    } else {
        options = { method: reqMethod, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
    }

    fetch(`${BASEURL}${url}`, options)
        .then((response) => {
            if (!response.ok) throw new Error(response.status + ': ' + response.statusText);
            return response.json();
        })
        .then((res) => responseHandler(res))
        .catch((err) => alert(err));
}
