import { Typography } from "@mui/material";

const BirthDateText = () => {
    return (
        <>
            {" "}
            <Typography variant="h6" component="h4" className="bday-title">
                Birth date
            </Typography>
            <Typography
                variant="subtitle2"
                component="small"
                color="secondary.dark"
                fontWeight={400}
            >
                This information will not be displayed publicly. Confirm your
                age, even if this account is for a business, a pet, or something
                else.
            </Typography>
        </>
    );
};

export default BirthDateText;
