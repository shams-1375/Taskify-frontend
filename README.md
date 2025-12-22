Taskify – Task Management Web Application

Taskify is a full-stack task management web application designed to help users efficiently create, organize, and track their tasks. It supports task assignment, priority management, and time-based sorting with a secure authentication system and a modern UI.

 Live Demo:
 https://taskify-frontend-c7lm.onrender.com

How to Use : 

1) Open the live link : https://taskify-frontend-c7lm.onrender.com

2) Sign up using a valid email and create a min 8 character's password

3) Log in to access the dashboard

4) get into the Taskify and Create, update, delete, and assign tasks

5) Set priority (High / Medium / Low) and view tasks by Today / Week

ScreenShots : 

SignUp : <img width="1600" height="769" alt="image" src="https://github.com/user-attachments/assets/5f1739db-04ff-4ca3-aa96-76ef7d9c5e43" />

Dashboard : <img width="1584" height="773" alt="image" src="https://github.com/user-attachments/assets/02dadb88-595c-4c7b-9a21-5a932568be33" />

Pending : <img width="1581" height="771" alt="image" src="https://github.com/user-attachments/assets/fd03edee-d0e8-45e6-aa56-22c98d013e6d" />

Completed : <img width="1576" height="759" alt="image" src="https://github.com/user-attachments/assets/8fa2fbcc-9fe3-4aa2-8bdd-9b20fb451d06" />

Create Task Modal : <img width="1581" height="768" alt="image" src="https://github.com/user-attachments/assets/5af5142e-758f-49d8-b4f5-7bb8e69f911f" />






Features :  
Task Management
Create new tasks with title, description, priority, due date and assignedTo
Update existing tasks
Delete tasks
Assign tasks to other registered users
Smart Task Sorting


View tasks by:
Today
This Week

Priority-based categorization:
High
Medium
Low

User Management :
Secure user registration and login
Assign tasks to users within the application
Profile page to update user details

Authentication & Security : 
Secure login and logout
Protected routes for authenticated users

JWT-based authentication : 
Modern UI
Responsive and clean user interface
Built with Tailwind CSS
Smooth user experience using React + Vite

Tech Stack : 
Frontend
React.js (Vite)
Tailwind CSS
React Router
Axios
Backend
Node.js
Express.js
MongoDB Atlas
JWT Authentication

Project Structure : 
Taskify/
 frontend/
  src/
  components/
  pages/
  services/
  App.jsx
  
backend/
  controllers/
  models/
  routes/
  middleware/
  server.js
README.md

Installation & Setup
Clone the Repository
git clone https://github.com/shams-1375/Taskify.git
cd Taskify

Frontend Setup
cd frontend
npm install
npm run dev

Backend Setup
cd backend
npm install
npm start

Environment Variables
Create a .env file in the backend folder:
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
PORT=5000

Authentication Flow : 
Users must log in to access the dashboard
JWT tokens are used for session management
Unauthorized users are redirected to the login page

Future Enhancements :
Email notifications for task deadlines
Drag and drop task management
Admin role for advanced task control
Dark mode support

Author:-

Mohammed Shams Ahmed

GitHub: https://github.com/shams-1375

LinkedIn: https://www.linkedin.com/in/mohammed-shams-ahmed-b82b942a4
