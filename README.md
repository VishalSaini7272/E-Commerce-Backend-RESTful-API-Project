# E-Commerce-Backend-RESTful-API-Project


Node.js | Express | MongoDB | JWT | bcrypt

This is a RESTful E-Commerce Backend API built using Node.js, Express, and MongoDB.
The project covers User Authentication, Products, Cart, Orders, along with querying, aggregation, and security using JWT & bcrypt.

Features:-

. User authentication (Signup / Login) using JWT

. Password hashing using bcrypt

. Secure Cart & Order APIs (JWT protected)

. Public Product listing with protected write operations

. Advanced querying (filter, search, pagination)

. Aggregation APIs (analytics & reports)

. Clean MVC folder structure

. Postman-friendly APIs

Tech Stack:-

. Backend: Node.js, Express.js

. Database: MongoDB (Mongoose)

. Authentication: JWT

. Security: bcrypt

. API Testing: Postman


API ENDPOINTS (For Postman Testing):-
 USER APIs (/api/users):-

*Auth:-
. POST   /api/users/signup,
. POST   /api/users/login,
. PUT    /api/users/reset/:id,
. GET    /api/users/logout

*User Data:-
. GET    /api/users/users,
. GET    /api/users/users/id/:id,
. GET    /api/users/users/name/:name,

*User Query APIs:-
. GET    /api/users/by-name?name=abc,
. GET    /api/users/by-role?role=user,
. GET    /api/users/by-status?isActive=true,
. GET    /api/users/pagination?page=1&limit=5

*User Aggregation APIs:-
. GET    /api/users/count-by-role,
. GET    /api/users/status-count,
. GET    /api/users/sort,
. GET    /api/users/paginate?page=1&limit=5

*CART APIs (/api/cart) with JWT Protected:-
. GET    /api/cart/cart,
. POST   /api/cart/cartAdd,
. PUT    /api/cart/cartUpdate/:id,
. DELETE /api/cart/cartDelete,
. DELETE /api/cart/cartAllClear



*ORDER APIs (/api/orders) with JWT Protected:-
User Orders:-
. POST   /api/orders/createOrder,
. GET    /api/orders/getAllOrders,
. GET    /api/orders/getOrderById/:id

*Order Management:-
. PUT    /api/orders/updateOrderStatus/:id,
. DELETE /api/orders/deleteOrder/:id

*Order Query APIs:-
. GET    /api/orders/user/:userId,
. GET    /api/orders/amount?min=500&max=5000,
. GET    /api/orders/product/:productId,
. GET    /api/orders?page=1&limit=10

*Order Aggregation APIs:-
. GET    /api/orders/agg/status-count,
. GET    /api/orders/agg/user-spending,
. GET    /api/orders/agg/top-products

*PRODUCT APIs (/api/products):-
Public APIs:-
. GET    /api/products/products,
. GET    /api/products/products/:name

*Protected APIs (JWT):-
. POST   /api/products/createProduct,
. PATCH  /api/products/updateProduct/:id,
. DELETE /api/products/deleteProduct/:name

*Product Query APIs:-
. GET    /api/products/productName?name=phone,
. GET    /api/products/greaterThan/:value,
. GET    /api/products/PriceBetween/:min/:max,
. GET    /api/products/all_products,
. GET    /api/products/pagination?page=1&limit=10

*Product Aggregation APIs:-
. GET    /api/products/aggregate,
. GET    /api/products/match,
. GET    /api/products/sort,
. GET    /api/products/pagination?page=1&limit=5

*Security Implemented:-

. Password hashing using bcrypt

. JWT based authentication

. Protected Cart & Order routes

. User-specific data access


*API Testing:-

All APIs are tested using Postman.
Protected routes require JWT token in headers.

*Author:-

Name : Vishal Saini
MERN Stack Developer

