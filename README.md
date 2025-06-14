# Letters to Future Self

A web application that allows users to write messages to their future selves, with scheduled email delivery and public/private letter options.

## Features

- Write letters to your future self
- Schedule email delivery for a future date
- Choose between private and public letters
- Browse public letters from other users
- User authentication for message management
- Responsive, modern UI

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Formik + Yup

### Backend
- Node.js + Express.js
- MongoDB
- node-cron for scheduling
- Nodemailer for email delivery

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```
3. Create `.env` file in the server directory with required environment variables
4. Start the development servers:
   ```bash
   # Start frontend (in client directory)
   npm run dev

   # Start backend (in server directory)
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## License

MIT 