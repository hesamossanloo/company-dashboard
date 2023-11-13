This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Plugins

This project uses prettier to ensure uniform code styling, eslint to ensure correct syntax and husky to ensure that code styling and syntax are maintained before each commit is made to Github.

```bash
To check if the styling is correct use command:

yarn prettiercheck

To modify the incorrect styling and fix the problems, use the command:

yarn prettierwrite

To check if the syntax is correct, use the command:

yarn lint
```

The style and syntax check is done automatically by husky as we make a new commit. If there are any issues, then the commit will return an error message with a list of issues found. Once the issues are fixed, the commit has to be done again.
