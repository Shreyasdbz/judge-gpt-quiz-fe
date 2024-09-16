# Judge GPT - UI

Welcome to **Judge GPT**, a quiz-style application designed to challenge users' ability to detect misinformation and fake news. This project forms the frontend and user interface of a two-part application. The goal is to test users' ability to identify fake news, with the ultimate aim of creating machine learning models that enhance real-world misinformation detection.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Project Overview

**Judge GPT** is an interactive quiz that assesses how well users can distinguish between real and fake news. This UI communicates with a backend API to manage the quiz experience and collect user data for further analysis.

The full project is split into two parts:

1. **Judge GPT UI (this repository)** - A Next.js-based application for user interaction, quiz management, and scoring.
2. **Judge GPT Analysis** - A Python-based backend that generates fake news, analyzes quiz results, and creates PowerBI visualizations. The ultimate goal is to use this data to enhance machine learning models for misinformation detection.

## Features

- **Multi-language Support**: The app is available in English, Spanish, French, and German, with other languages easily configurable.
- **Profile Setup**: Users can create and manage profiles, allowing personalized quizzes.
- **Real-time Scoring**: A detailed score dashboard lets users compare their performance and see group comparisons.
- **Misinformation Detection Quiz**: A fun and challenging game to test whether users can detect fake news.
- **Data Analytics**: Collected data is analyzed to understand how various groups perform, contributing to machine learning models designed to detect misinformation in real-world scenarios.

## Technologies Used

This project leverages modern web development technologies and libraries to provide a seamless and scalable user experience.

### Frontend & Framework

- **[Next.js](https://nextjs.org/)**: A full-stack React framework with server-side rendering, API routes, and optimized performance. This forms the core of our application, allowing for both static and dynamic content rendering.

### UI & Styling

- **[ShadCn UI](https://shadcn.dev/)**: A beautiful, class-based UI component library built on top of TailwindCSS, used for building responsive, accessible, and modern designs.

### Database

- **[Azure CosmosDB for MongoDB](https://azure.microsoft.com/en-us/services/cosmos-db/mongodb/)**: A globally distributed, scalable, NoSQL database service. We use CosmosDB with MongoDB for user profiles, quiz results, and other application data.

### Form & Schema Validation

- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library used for validating quiz inputs and other forms within the app. Ensures a secure and consistent data flow between the UI and the API.

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)**: A localization library for Next.js, used to offer seamless language switching between English, Spanish, French, and German. It also allows for easy integration of additional languages.

## Pages

- **Home**: The landing page where users can create and manage their profiles.
- **Quiz**: The heart of the application, where users participate in the misinformation detection quiz.
- **Scores**: A dashboard for users to view their individual scores and compare group performance, providing insights into how well different groups detect fake news.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js >= 14.x
- Yarn or npm

### Clone the Repository

```bash
git clone https://github.com/yourusername/judge-gpt-ui.git
cd judge-gpt-ui
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```
MONGO_DB_CONNECTION_STRING="<your-mongodb-uri>"
```

### Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Set Up a Profile**: On the home page, create a user profile to track your quiz performance.
2. **Take the Quiz**: Head over to the quiz page to start testing your ability to identify misinformation.
3. **View Scores**: Once completed, you can view your scores and compare your results with others on the scores page.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
