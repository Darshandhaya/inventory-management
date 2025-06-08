 🗃️ Inventory Management System

A full-stack web application for managing inventory efficiently, built with React, Node.js, Express, and MongoDB. This system helps users track products, categories, and quantities, with support for user authentication and a clean dashboard UI.

🔧 Features

- ✅ User registration and login
- 📦 Add, update, delete inventory items
- 🔍 Search and filter items
- 📊 Dashboard with item statistics
- 🛠️ RESTful API integration
- ☁️ Deployed using Render (Backend) and Netlify (Frontend)



🚀 Live Demo

🌐 [Frontend (Netlify)]([https://your-netlify-url.netlify.app](https://d-inventory-management-app.netlify.app/))  
🖥️ [Backend (Render)]([https://your-render-api-url.onrender.com](https://inventory-management-ad4c.onrender.com))



 🛠️ Tech Stack

| Frontend       | Backend        | Database  | Deployment     |
|----------------|----------------|-----------|----------------|
| React          | Node.js        | MongoDB   | Netlify (FE)   |
| CSS Modules    | Express.js     | Mongoose  | Render (BE)    |
| React Router   | JWT Auth       |           |                |

---

 📦 Project Setup

 1. Clone the repository
git clone https://github.com/your-username/inventory-management.git
cd inventory-management

2. Setup the backend

cd server
npm install
touch .env
npm start

3. Setup the frontend

cd ../client
npm install
npm start


🔁 API Endpoints
Base URL: https://inventory-management-ad4c.onrender.com

Auth
Endpoint	Method	Description
/api/auth/register	POST	Register a new user
/api/auth/login	POST	Login and get JWT token

Items
Endpoint	Method	Description
/api/items	GET	Fetch all items (Auth)
/api/items/:id	GET	Fetch item by ID
/api/items	POST	Add new item (Auth)
/api/items/:id	PUT	Update item (Auth)
/api/items/:id	DELETE	Delete item (Auth)

Most routes require a valid Bearer Token in the header.

📚 Usage Instructions
1.Register a new account or log in.

2.Use the dashboard to view analytics and recent items.

3.Click “Add New Item” to insert inventory.

4.Use the search to find items by name or category.

5.Navigate to "All Items" to edit/delete existing records.

🧪 Testing
You can test API routes using tools like Postman or Insomnia.

🙌 Acknowledgements
Render for backend hosting

Netlify for frontend deployment

MongoDB Atlas for database hosting



