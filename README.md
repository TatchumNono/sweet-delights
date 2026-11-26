# Sweet Delights 🍰

**A modern e-commerce platform for a pastry and fresh fruit juice business.**

Sweet Delights is a web application I developed for a family-owned business to help manage and sell its products online. The platform provides a simple shopping experience for customers while offering product and order management capabilities.

🔗 **Live application:** [https://sweet-delights-weld.vercel.app/](https://sweet-delights-weld.vercel.app/)

## 🎯 Project Objectives

The goal was to provide the business with an online presence where customers could discover products and conveniently place orders, while simplifying product and order management.

## ✨ Features

- **Account Creation:** User account creation and authentication.
- **Product Management:** Create, view, update and delete products (CRUD).
- **Product Catalogue:** Browse available pastries and fruit drinks.
- **Shopping Cart:** Add products and manage shopping selections.
- **Order Management:** Manage customer orders and their information.
- **Responsive Interface:** An accessible shopping experience across different devices.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend and application development |
| Prisma ORM | Database access and data management |
| Vercel | Application deployment |

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A configured database supported by the Prisma schema

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TatchumNono/sweet-delights.git
   cd sweet-delights
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables in a `.env` file. For example:

   ```env
   DATABASE_URL="your_database_connection_string"
   ```

   Add any other environment variables required by the application.

4. Generate the Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

*Note: Database initialization and migration commands depend on the Prisma schema and migration files included in the repository.*

## 🌐 Deployment

The application is deployed using [Vercel](https://vercel.com/).

## 👨‍💻 About the Project

This project was developed for a real business need, from understanding the requirements to implementation and deployment.

I completed the initial development and deployment within approximately one week, leveraging AI-assisted development tools to accelerate implementation while reviewing and validating the generated code.

**Developed by Yan Russel Tatchum Nono.**
