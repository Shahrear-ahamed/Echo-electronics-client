import React from "react";

const Blog = () => {
  return (
    <section>
      <div className="container mx-auto w-11/12 md:w-9/12">
        <div className="my-5">
          <h2 className="text-2xl font-semibold">
            1. Difference between javascript and nodejs.
          </h2>
          <ul className="my-5 px-2">
            <li>
              1. JavaScript is a programming language that works with websites
              and webpages, but Nodes is a JavaScript runtime environment used
              to write and work on server side using JavaScript.
            </li>
            <li>
              2. We can run javascript only in browser, on the other hand Node
              Js can run outside on the browser
            </li>
            <li>
              3. JavaScript can run any type of browser, but Node JS can only
              run the V8 engine developed by Google
            </li>
            <li>
              4. JavaScript is basically used for frontend development, some
              JavaScript libraries are ReactJS, Angular, Vue Js while Node JS is
              used for server or backend development, the most popular node JS
              framework is Express JS
            </li>
          </ul>
        </div>
        <div className="my-5">
          <h2 className="text-2xl font-semibold">
            2. When should you use nodejs and when should you use mongodb ?
          </h2>
          <p className="my-5">
            Node JS and MongoDB are two different think.
            <span className="block my-5 text-gray-700 font-semibold">
              When i should use NodeJS ?
            </span>
            Node JS is a JavaScript runtime environment. Node JS are used for
            make backend or server, with the through of JavaScript. sometime
            here node js are work some common mathmatical calculation. it
            basically used for server side development.
            <span className="block my-5 text-gray-700 font-semibold">
              When i should use MongoDB ?
            </span>
            MongoDB is a database management system. Where we can store data
            from client-side and display data based on client's request. We can
            manage or manipulate our data through CRUD operation, here we can
            create, request, update and even delete. MongoDB is a database where
            we can store our website data. MongoDB provide api to connect
            database with nodejs or server.
          </p>
        </div>
        <div className="my-5">
          <h2 className="text-2xl font-semibold">
            3. Differences between SQL and NoSQL databases.
          </h2>
          <ul className="my-5 px-2">
            <li>
              1. SQL is a relational database management system, and NoSQL is a
              non-relational database management system. SQL is a structured
              query language and NoSql is a non-structural query language.
            </li>
            <li>
              2. SQL database have predefined or static schema for structured
              data, and NoSQL database have dynamic schema for non structured
              data.
            </li>
            <li>
              3. SQL databases are vertically scalable and suite for complex
              query, NoSQL databases are horizontally Scalable and it's not
              suite for complex query.
            </li>
            <li>
              4. SQL databases are table-based, SQL data are stored in tabular
              format and NoSQL databases are non-table-based, NoSQL databases
              stored data using JSON format.
            </li>
          </ul>
        </div>
        <div className="my-5">
          <h2 className="text-2xl font-semibold">
            4. What is the purpose of jwt and how does it work ?
          </h2>
          <p className="my-5">
            Jwt defines a JSON object as a compact and automated way to securely
            transfer information between parties between client side and server
            side.
            <span className="block">JWT work with 2 way.</span>
            1. Frist server creates a token with jwt and sends it to client and
            saves it somewhere. <br />
            2. The server wants this token key for each or private access to the
            server from the client. The server then tries to verify that this
            token is valid, after verifying the jwt check the user access token
            and the user id. If the access is successful, the user will not
            receive a successful response. The user will receive an error or
            deny the user access. <br />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
