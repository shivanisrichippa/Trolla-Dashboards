# Secure Dashboard - README

## Objective
Develop a secure dashboard using **Next.js**, **Tailwind CSS**, and **TypeScript**, incorporating **JWT-based authentication (login/logout)**.

---

## Tech Stack
### Frontend
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit

### Backend
- **Framework:** Express (using TypeScript)
- **Database:** MongoDB Atlas (Cluster) (using Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Environment Handling:** dotenv

### Dependencies
Frontend:
- @reduxjs/toolkit
- axios
- bcryptjs
- cookie-parser
- framer-motion
- jsonwebtoken
- next
- next-auth
- react
- react-dom
- react-icons
- react-redux

Backend:
- bcryptjs
- body-parser
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongodb
- mongoose

### Dev Dependencies
- nodemon
- ts-node
- typescript
- @types (for TypeScript support)

---

## Requirements
### Authentication System
- Implement user authentication using JWT.
- Create a login page with email & password fields.
- Validate user credentials and generate a JWT upon successful login.
- Store the JWT securely using **localStorage**.
- Implement logout functionality to clear the token.
- Protect dashboard routes to allow access only for authenticated users.

### Dashboard UI
- Simple and attractive dashboard with a sidebar and main content area.
- Styled using Tailwind CSS.
- Display a welcome message with the user's name (from JWT payload).
- Include a "Logout" button.

### API Endpoints
- `POST /api/user/register`: Store user data (email, password, and username).
- `POST /api/auth/login`: Authenticate user and return JWT.
- `POST /api/auth/logout`: Invalidate JWT (if stored in cookies).
- `GET /api/user`: Fetch user data (protected route).

### Route Protection
- Use **Next.js middleware** or `getServerSideProps` to check authentication. 
- Authentication is implemented by extracting the token from the **Authorization header** of incoming requests, verifying it using **jsonwebtoken**, and attaching the decoded user details to the request object.
- Redirect unauthenticated users to the login page.

---

## Project Setup

### Frontend (Next.js)
1. Clone the repository:
```bash
   git clone <your-repo-url>
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm run dev
```

4. Build the project:
```bash
   npm run build
```

5. Start the production server:
```bash
   npm run start
```

### Backend (Express)
1. Move to backend directory:
```bash
   cd backend
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file with the following content:
```
   PORT=5000
   MONGO_URI=<Your MongoDB Atlas URI>
   JWT_SECRET=<Your JWT Secret>
```

4. Run the development server:
```bash
   npm run dev
```

---

## Usage
1. **User Registration:** Make a `POST` request to `/api/user/register` with email, password, and username.
2. **User Login:** Make a `POST` request to `/api/auth/login` with email and password. Token is stored in **localStorage**.
3. **Access Dashboard:** The user can access protected routes once authenticated.
4. **Logout:** Call the `/api/auth/logout` endpoint to clear the token.

---

## Security Considerations
- Tokens are stored in **localStorage**. For enhanced security, consider using HttpOnly cookies.
- Ensure proper CORS handling on the backend.
- Utilize `express-validator` for sanitizing user inputs.

---



