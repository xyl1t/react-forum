# react-forum

Barebones, anonymous, cheap, Reddit like forum. It was made as a school
assignment. Doesn't really have a backend - it uses a 
[mock server](https://github.com/typicode/json-server).

Made using React, Vite and Tailwind.

## How to run

Clone the repo and run these commands:

```shell
$ npm i               # install dependencies
$ npm run dev         # start the client
$ npm run mock-server # start the mock server
```

And open http://localhost:5173/

## Some Challenges and what I learned

* Getting it to look nice was a bit challenging, but possible using Tailwindcss.
* Nesting comments required recursion
  * Show the number of comments for a post: since the top post only stores the
    immediately following branches, you have to traverse it down recursively in
    order to get the total amount of comments for a post
  * Recursive components/Nested comments
* I learned how to use localStorage (for storing votes and usernames)
