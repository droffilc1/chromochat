// data for the component

const textContentData = {
    __AgeConfirmation__: () => (
        <>
            This information will not be displayed publicly. Confirm your age,
            even if this account is for a business, a pet, or something else.
        </>
    ),
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from(
    { length: 101 },
    (_, i) => new Date().getFullYear() - i
);

export { months, days, years, textContentData };
