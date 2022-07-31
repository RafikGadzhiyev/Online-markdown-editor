This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# 🔴 This is a test text whic You can use to see markdown 🔴:

# Hello, world!
___

# Little example:
If you want to use italic text just use 
```markdown
*write text here*
```
If you want to use bold text just use 
```markdown
**write text here**
```
If you want to use italic + bold text just use 
```markdown
***write text here***
```

If you want to use more complex thing such as link here you are:

[Link to this page](http://localhost:3000)

1. List
2. Another list
* Item
    1. First Subitem
    2. Second Subitem

```ts	
// let's write factorial function 

const factorial = (n: number): number => {
	return n === 1 ? 0 : n * factorial(n - 1);
}

interface IProps extends React.PropsWithChildren {
    total: number,
    usage: {
        last_time: Date,
        today: null | Date
    }
}

```

```tsx
const [state, setState] = React.useState<number>(0);
React.useEffect(() => {
   console.log("Hello, World!");
}, [])
```

```java
package package_name;

class Main {
    public static void main(string argv[]){
        System.out.println("Hello, world!");
    }
}
```
