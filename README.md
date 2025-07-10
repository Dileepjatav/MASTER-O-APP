Master-O-APP – Node.js + Express + MySQL
This is the backend service for a skill-based quiz platform. It provides user authentication, role-based access, skill management, question CRUD, quiz attempts, and performance reporting.

🚀 Tech Stack
Backend: Node.js, Express
Auth: JWT (role-based: user, admin)
Database: MySQL
Validation: Zod
Security: CORS, bcrypt

📂 Project Structure

Master-O-APP/
├── controllers/ # Route logic
├── middlewares/ # Auth, role guards
├── routes/ # Express route files
├── services/ # Business logic (e.g., quiz scoring)
├── config/ # DB connection, env loader
├── server.js # Express app & Entry point
└── .env # Environment config (never push to Git)
└── .quiz_db_schema.sql # Mysql schema
└── .setup.js # Database setup script

⚙️ Setup Instructions

1. Clone the Repo
   git clone https://github.com/Dileepjatav/MASTER-O-APP.git
   cd Master-O-APP

2. Install Dependencies
   npm install

3. Configure Environment
   Create .env based on .env.example:
   cp .env.example .env

4. Setup database & seed Data
   run node setup.js OR npm run seed

5. Run the Server
   npm run dev

# or

node server.js
🗃️ Environment Variables
.env.example:

PORT=3002
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quiz_app
JWT_SECRET=super_secret
JWT_EXPIRES_IN=1d

🧪 API Endpoints
🔐 Auth
POST /api/auth/signup
POST /api/auth/login

👥 Users
GET /api/users (admin only)
DELETE /api/users/:id (admin only)

📘 Skills
GET /api/skills
POST /api/skills (admin)

❓ Questions
GET /api/questions?skill_id&page&limit
POST /api/questions (admin)
PUT /api/questions/:id (admin)
DELETE /api/questions/:id (admin)

🧠 Quiz Attempts
POST /api/attempts
GET /api/attempts/history
GET /api/reports (admin)

🔒 Auth Flow
JWT is issued on login and must be sent via Authorization: Bearer <token> for protected routes.
Role-based guards restrict access to admin routes.

📊 Reports
Admins can:

View user-wise performance
Identify skill gaps
Export or display analytics

🛠️ Dev Scripts

npm run dev # Start server with nodemon
npm run seed # Seed dummy data

Admin login
Email admin@example.com
Pass. admin

User login
Email user@example.com
Pass. admin
