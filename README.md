# **TODO-NEW**

A simple and intuitive To-Do list web application that allows users to manage their tasks efficiently. This app is built with React for the frontend and Node.js with Express for the backend, connected to a MongoDB database. The app is fully deployed using Vercel for the frontend and Render/Cyclic (or other platforms) for the backend.

---

## **Features**
- **Task Management**: Users can add, edit, and delete tasks.
- **Task Status**: Mark tasks as completed or pending.
- **Filtering**: Filter tasks by their status (completed, pending).
- **User Authentication**: Optionally sign up or log in to save tasks (if implemented).
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## **Technologies Used**
### **Frontend**
- **React.js** - JavaScript library for building user interfaces.
- **React Router DOM** - For handling navigation between different pages.
- **Axios** - For making HTTP requests to the backend.
- **CSS/Styled Components** - For styling the application.

### **Backend**
- **Node.js** - JavaScript runtime for building the backend server.
- **Express.js** - Web framework for Node.js to create the API.
- **MongoDB** - NoSQL database to store user tasks.
- **Mongoose** - ODM for MongoDB to interact with the database.
- **JWT** - For user authentication and maintaining sessions.

---

## **Setup Instructions**

### **1. Clone the Repository**

Start by cloning the repository to your local machine:
```bash
git clone https://github.com/Sadikhaismail/TODO-NEW.git
cd TODO-NEW
2. Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Install the backend dependencies using npm:

bash
Copy code
npm install
Create a .env file in the backend folder for environment variables. Add the following variables:

plaintext
Copy code
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-secret-key>
MONGO_URI: Your MongoDB database connection string. If you are using MongoDB Atlas, you can get this from the Atlas dashboard.
JWT_SECRET: A secret key for JWT token signing. This can be any random string (e.g., mysecretkey).
Start the backend server:

bash
Copy code
npm run start
This should start the backend server on http://localhost:5000.

3. Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the frontend dependencies using npm:

bash
Copy code
npm install
Create a .env file in the frontend folder for the API URL. Add the following variable:

plaintext
Copy code
REACT_APP_API_URL=http://localhost:5000
This will point the frontend to your locally running backend server.

Start the frontend development server:

bash
Copy code
npm start
This will run the frontend on http://localhost:3000.

Deployment
Frontend is deployed on Vercel:
Vercel URL for Frontend

Backend is deployed on Render/Cyclic (or any other platform):
Backend URL

vbnet
Copy code

This should be enough for others to clone, set up, and run your application, both locally and on deployed platforms. Let me know if you need any more adjustments!
