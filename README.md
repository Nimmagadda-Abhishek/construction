# Construction Company Website

A modern, full-stack website for a construction company built with React, TypeScript, Node.js, and MongoDB.

## Features

- 🎨 Modern UI with smooth animations using Framer Motion
- 🌐 Responsive design with Tailwind CSS
- 📱 Mobile-friendly interface
- 🔄 Real-time form validation
- 🎯 Dynamic project filtering
- 📝 Contact form with backend integration
- 🗄️ MongoDB database for data persistence
- 🔒 Secure API endpoints

## Tech Stack

### Frontend
- React with TypeScript
- Framer Motion for animations
- Tailwind CSS for styling
- Vite for build tooling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- TypeScript
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd construction
```

2. Install frontend dependencies:
```bash
# In the root directory
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:

Create a `.env` file in the backend directory with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/construction
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Create a `.env` file in the root directory with:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CONTACT_EMAIL=info@construction.com
VITE_CONTACT_PHONE=+1 (555) 123-4567
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
# In the root directory
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
├── src/                  # Frontend source code
│   ├── components/       # React components
│   ├── assets/          # Static assets
│   └── App.tsx          # Main application component
├── backend/             # Backend source code
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Express server setup
└── public/              # Public assets
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `GET /api/projects/category/:category` - Get projects by category

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/status/available` - Get available services

### Contact
- `POST /api/contact` - Submit contact form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.