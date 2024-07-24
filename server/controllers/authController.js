const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { fullname, email, password, bdDay, bdMonth, bdYear, phone } =
        req.body;

    try {
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res
                .status(400)
                .json({ message: "User with this email already exists," });
        }

        const userPhone = await User.findOne({ phone });
        if (userPhone) {
            return res
                .status(400)
                .json({
                    message: "User with this phone number already exists,",
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            bdDay,
            bdMonth,
            bdYear,
            password: hashedPassword,
            phone,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
