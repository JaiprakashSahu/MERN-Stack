# Contact Management App - MERN Stack

A full-stack Contact Management application built with MongoDB, Express, React, and Node.js.

## Project Structure

```
MERN Stack/
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ContactForm.jsx
    │   │   └── ContactList.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    └── package.json
```

## Features

- **Create Contacts**: Add contacts with name, email, phone, and message
- **View Contacts**: Display all contacts sorted by newest first
- **Delete Contacts**: Remove contacts with live UI updates
- **Form Validation**: Client-side validation with error messages
- **Responsive Design**: Works on desktop and mobile devices

---

## Running Locally

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/contact-management

# Start backend
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env (optional, defaults to localhost:5000)
# VITE_API_URL=http://localhost:5000/api

# Start frontend
npm run dev
```

### 3. Open in Browser

Visit `http://localhost:5173` to use the app.

---

## Deployment

### Backend (Render / Railway)

1. Push backend code to GitHub
2. Create new Web Service on Render or Railway
3. Set environment variables:
   - `PORT`: 5000 (or let platform assign)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend (Vercel)

1. Push frontend code to GitHub
2. Import project on Vercel
3. Set environment variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api`)
4. Framework preset: Vite
5. Build command: `npm run build`
6. Output directory: `dist`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| POST | `/api/contacts` | Create new contact |
| DELETE | `/api/contacts/:id` | Delete contact by ID |

### Request Body (POST)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "message": "Optional message"
}
```

---

## Tech Stack

- **Frontend**: React 18, Vite, Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **HTTP Client**: Fetch API

## Notes

- Frontend communicates with backend via environment-based API URL (`VITE_API_URL`)
- Contacts are displayed in reverse chronological order using `createdAt` timestamp
