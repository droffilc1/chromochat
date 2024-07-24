import libphonenumber from "google-libphonenumber";

function formatPhoneNumber(phoneNumber) {
    const PNF = libphonenumber.PhoneNumberFormat;
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    let formattedNumber;

    try {
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber.toString());
        formattedNumber = phoneUtil.format(number, PNF.INTERNATIONAL);
    } catch (error) {
        console.error("Error parsing phone number:", error);
    }

    return formattedNumber;
}

export default formatPhoneNumber;
