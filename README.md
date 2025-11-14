🛍️ Sheen Full-Stack MERN eCommerce Application


A complete end-to-end eCommerce platform built using the MERN stack, featuring user authentication, a shopping cart, product search with smart ranking, PayPal payments, order management, and a fully-featured admin dashboard for managing products, users, orders, and analytics.

This project demonstrates real-world full-stack development, scalable architecture, reusable UI patterns, REST API design, and modern React app structuring using Redux Toolkit & RTK Query.


Features:

Customer Features:

* Browse all products with images, price, brand, and categories
* Smart search with ranked results (exact → startsWith → contains)
* Filter products by categories, brands, and price
* Responsive UI with modern Tailwind styling
* Add to cart, update quantity, remove items
* Secure login/register (JWT authentication)
* Checkout flow with shipping → payment → order summary
* Real PayPal payment integration
* View all previous orders


Admin Dashboard:
* Product Management

  * Create, edit, delete products
  * Upload product images
* Category Management
* Order Management

  * View all orders with status
  * Mark orders as paid/delivered
  * Cancel orders (with validation: paid/delivered orders cannot be deleted)
* User Management
* Sales Analytics

  * Total orders
  * Total revenue
  * Daily sales chart



Tech Stack:
Frontend:
* React + Vite
* Redux Toolkit
* RTK Query
* React Router v6
* TailwindCSS
* React Icons

Backend:
* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (file uploads)
* Nodemon
* PayPal REST SDK



 📁 Project Structure:
```
Sheen/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│   └── vite.config.js
│
├── uploads/
└── package.json
```

Authentication:
JWT-based login system with:
* Access tokens
* Protected routes (both backend + frontend)
* Admin-only routes using middleware

Payment System:
✔ Integrated PayPal REST API
✔ Paid orders stored with transaction reference
✔ Payment flow only accessible to authenticated users



Installation Guide:
 Clone the repository
```bash
git clone https://github.com/Abraar77/Sheen-Ecom.git
cd Sheen-Ecom
```

 Install dependencies
 Backend

```bash
cd backend
npm install


 Frontend
```bash
cd frontend
npm install
```

 Add environment variables

Create a .env` file in `/backend`:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
PAYPAL_CLIENT_ID=your_paypal_id
PORT=5000


---

Run the Project:

```bash
npm run dev.. to run both frontend and backend
npm run frontend.. to run only frontend
npm run backend... to run only backend 
```

This starts:
* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000](http://localhost:5000)



Admin Credentials
Create an admin user manually in MongoDB:


{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securePassword",
  "isAdmin": true
}


Key Learning Highlights:

This project demonstrates:
* Scalable MERN architecture
* Authentication & Authorization flows
* Clean API structure with controllers
* Payment gateway integration
* Global state management with Redux Toolkit
* Reusable component patterns
* Real-world admin dashboard logic
* Error handling & validation
* File uploads with Multer
* Deployment-ready folder structure



Contributions:
Pull requests are welcome. Open an issue for feature requests or bugs.


Author:
Abraar:
> Passionate Full-Stack MERN Developer
> Building scalable real-world applications with clean architecture

=

If you found this project useful, please consider giving it a star!



