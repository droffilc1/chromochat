const axios = require("axios");
const options = {
    method: "GET",
    url: "https://debounce-email-validation.p.rapidapi.com/v1/",
    headers: {
        "x-rapidapi-key": "Sign Up for Key",
        "x-rapidapi-host": "debounce-email-validation.p.rapidapi.com",
    },
};

async function validateEmail() {
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

validateEmail();
