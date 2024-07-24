require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User"); // Assuming this is your updated User model

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

async function updateIndexes() {
    try {
        // Drop old indexes
        await User.collection.dropIndexes();

        // Mongoose automatically creates indexes based on the schema when the application starts.
        // However, if you need to create custom indexes, you can do so like this:
        // await User.collection.createIndex({ 'newField': 1 });

        console.log("Indexes updated successfully");
    } catch (error) {
        console.error("Failed to update indexes", error);
    }
}

updateIndexes().then(() => mongoose.disconnect());
