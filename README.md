# Link Shortener

A simple and customizable URL shortener built with Next.js, Prisma, and Tailwind CSS. This project allows users to shorten URLs, customize the shortened path, and easily copy the resulting link.

## Features
- Generate short URLs from full links
- Customize generated short codes
- Copy shortened URL to clipboard

## Tech Stack
- **Next.js** – React framework
- **Prisma** – ORM for database operations
- **Tailwind CSS** – Utility-first CSS framework
- **TypeScript** – For type safety

## Setup
1. **Clone the repo: **
   ```git clone https://github.com/your-username/link-shortener.git```
   ```cd link-shortener```

2. **Run the following command to install all required dependencies: **
  ```npm install```

3. **Configure your database: **
  ```DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/database_name?schema=public"```

4. **Run Prisma migrations: **
   ```npx prisma migrate dev --name init```

5. **Start the development server: **
   ```npm run dev```

Open http://localhost:3000 in your browser.

## Usage
- **Shorten a URL:** Enter a full URL on the homepage and click "Shorten".
- **Customize:** Click "Customize" next to your short URL to set a custom code.
- **Copy:** Use the "Copy" button to copy the URL to your clipboard.

## Error Handling
- If a custom short code already exists (unique constraint violation), you will receive a conflict error (HTTP 409) stating "Short code already taken."
- Other errors such as invalid input or missing URL will also be handled appropriately, and error messages will be displayed on the UI.
