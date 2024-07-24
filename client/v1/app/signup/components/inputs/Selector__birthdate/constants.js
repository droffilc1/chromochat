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

// I will try to integrate this changes with the code, importing everything here makes it doensn't work
//* if (month === "February") {
//*     const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
//     if (isLeapYear) {
//         days = Array.from({ length: 29 }, (_, i) => i + 1);
//     } else {
//         days = Array.from({ length: 28 }, (_, i) => i + 1);
//     }
// } else if (["April", "June", "September", "November"].includes(month)) {
//     days = Array.from({ length: 30 }, (_, i) => i + 1);
//* }

export { months, days, years };
