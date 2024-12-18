# Feedlytic

Feedlytic is a powerful web application for collecting and analyzing analytics, events, and user feedback. With its modern tech stack and intuitive features, Feedlytic makes it easy to monitor metrics and gather insights to enhance your applications.

---

## Features

- **Analytics Tracking**: Monitor user interactions and key metrics.
- **Event Logging**: Log and analyze specific events across your applications.
- **Feedback Collection**: Customizable forms to gather user feedback.

---

## Technologies Used

### Frontend:
- **[Next.js](https://nextjs.org/)**: For a fast, server-rendered React-based application.
- **[Tailwind CSS](https://tailwindcss.com/)**: To style the application with a utility-first CSS framework.
- **[shadcn/ui](https://ui.shadcn.dev/)**: For building reusable and accessible components.
- **[react-hot-toast](https://react-hot-toast.com/)**: For sleek and responsive notifications.

### Backend:
- **[Drizzle ORM](https://orm.drizzle.team/)**: A lightweight and type-safe ORM for database operations.
- **[PostgreSQL](https://www.postgresql.org/)**: A powerful, open-source relational database system.

---

## Installation

### Prerequisites:
- Node.js (v18 or later)
- PostgreSQL database
- npm or yarn package manager

### Steps:

1. **Clone the repository**:
   ```bash
   https://github.com/Abhi-wolf/Feedlytic.git
   cd feedlytic
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV="development"
   ```

4. **Run database migrations**:
   ```bash
   npm i drizzle-kit
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Sign In**: Use Google authentication to sign in.
2. **Track Events**: Use the provided API to log events with your applications.
3. **View Analytics**: Access dashboards to view aggregated analytics and feedback.
4. **Feedback Forms**: Generate and embed feedback forms to collect user input.

---

## API Endpoints

- **POST** `/api/track`: Track analytics.
- **POST** `/api/events`: Log a new event.
- **POST** `/api/feedback`: Submit user feedback.

---

## Contributing

We welcome contributions! If you find a bug or have an idea for a feature:
1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

---
