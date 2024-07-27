# Chromochat

## Overview

Chromochat is a cutting-edge chat application designed to bring people closer together through innovative features and a user-friendly interface.
Whether you're connecting with friends, family, or colleagues, Chromochat provides a rich and dynamic communication experience tailored to your needs.

## Technologies Used

- NextJS
- Node.js
- TypeScript
- Tailwind
- MongoDB
- Prisma
- Docker
- Github Actions

## Features

- Sign up a user
- Login a user
- Create a chat room
- Send messages in a chat room
- View users in a chat room
- Profile
- End-to-End Encryption
- Multi-Device Support

## Getting Started

To get a local copy up and running you just need to follow the following steps in your terminal;

```
git clone "url"
```

where "url" (without the quotation marks) is the url to this repository.

For example:

```bash
git clone https://github.com/droffilc1/chromochat.git
```

Here you're copying the contents of the chromochat repository on GitHub to your computer.

Change to the repository directory on your computer and run the app (if you are not already there):

```bash
cd chromochat
cd src
npm install
npm run dev
```

### Steps to Run the Docker Container

1. **Pull the Docker Image**

   Pull the Docker image from DockerHub:

   ```bash
   docker pull droffilc1/chromochat:latest
   ```

2. **Run the Docker Container**

   Run the container in detached mode, mapping port 3000 on your local machine to port 3000 in the container:

   ```bash
   docker run -d -p 3000:3000 --name chromochat droffilc1/chromochat:latest
   ```

3. **Check Running Containers**

   Verify that the container is running:

   ```bash
   docker ps
   ```

   You should see the `chromochat` container listed.

4. **Access the Application**

   Open a web browser and navigate to:

   ```bash
   http://localhost:3000
   ```

   You should see the Chromochat application running.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [MongoDB](https://www.mongodb.com/docs/atlas/)
- [Prisma](https://www.prisma.io/docs)
- [docker](https://docs.docker.com/)

## Authors

El Houssain Souhail - [Github](https://github.com/Ductive99)\
Abderrahmane Nezhavi Nezhari - [Github](https://github.com/Abderrahmane369)\
Clifford Mapesa - [Github](https://github.com/droffilc1)

## License

This project is licensed under the [MIT](./LICENSE) License.
