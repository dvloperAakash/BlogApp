- BlogsHub provides platform where users can share their knowledge related to technology,finance ,travel and lot more with other users.

- TECHNOLOGY USED:
  Frontend: React JS with material UI library.React-redux library for state management.
  Backend: NodeJS with express.js library
  Database: MongoDB Atlas

- Open two diffrent terminal ,one for client and one for server.

- How to start Application:
  On Client Side: 1. cd client. 2. npm install
  Database: 1. create .env file in server folder. 2. Put your mongodb atlas connection string like this. Take reference from .env.example file.
  CONNECTION_URL=YOURS_CONNECTION_URL
  On Server Side: 1. cd server. 2. npm install

\*FEATURES:

1.  Authentication. User can Sign Up and Sign In in application.
2.  Only authenticated user can do actions like creating,updating and deleting a post.
3.  Other user can only perform update and delete actions on their own post. They can just like and comment on other post.
4.  Like and comment functionality.
5.  One user can only perform 1 like on each post.
6.  User can click on the post to see full article.
7.  User can add images related to the post.
