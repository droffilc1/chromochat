# Server

This is a project's server side.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/droffilc1/chromochat.git
   ```

2. Install dependencies:

   ```
   cd server
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```
   PORT=<PORT>
   MONGO_URI=<MONGO_URI>
   JWT_SECRET=<JWT_SECRET>
   CLOUDINARY_CLOUD_NAME=<CLOUDINARY_CLOUD_NAME>
   CLOUDINARY_API_KEY=CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET=<CLOUDINARY_API_SECRET>
   ```

4. Start the server:

   ```
   npm run dev
   ```

## Features

- **MongoDB Database Setup:** The project integrates with MongoDB to store user data. Database configuration is handled using Mongoose.

- **User Model and Controller:** The application includes a user model and controllers for user registration, login, token generation.

- **Role-Based Authorization:** The project includes role-based authorization using middleware. You can define roles and restrict access to certain routes.

- **Error Handling:** Custom error handling middleware is implemented to provide consistent error responses.

## Endpoints

- **`POST /auth/register`:** Register a new user.

- **`POST /auth/login:`** Log in a user.

- **`POST /messages/send`:** Send a message to a chat room.

- **`GET /messages/{roomId}`:** Retrieve messages from a chat room.

- **`GET /messages/users/{roomId}`:** Retrieves bios of users in a chat room.

- **`POST /profile/picture`:** Upload a profile picture.

- **`POST /profile/:bio`:** Update user bio.

- **`POST /rooms/create`:** Create a new chat room.

- **`POST /rooms/join`:** Join an existing chat room.

## Contributing

Feel free to contribute to this starter project by submitting pull requests or suggesting improvements. Your contributions are greatly appreciated!

## License

This project is licensed under the MIT License.

---
