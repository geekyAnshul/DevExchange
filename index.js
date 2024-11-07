const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
//import { v4 as uuidv4 } from 'uuid';
const methodOverride = require('method-override');
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended:true }));

app.set('view engine', 'ejs');
app.set("path",path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));

let posts = [
    {
      id:uuidv4() ,
      username: "ReactJS",
      content: "React is a JavaScript library for building user interfaces.",
      description: "React is used to build single-page applications and mobile apps. It allows developers to create large web applications that can change data without reloading the page. The main goal of React is to be fast, scalable, and simple. It works by breaking down UI into reusable components."
    },
    {
      id: uuidv4(),
      username: "ExpressJS",
      content: "Express.js is a web application framework for Node.js.",
      description: "Express.js is used for building web applications and APIs. It simplifies the development of server-side logic by providing a set of features like routing, middleware support, and HTTP utility methods. It's a minimal and flexible framework, making it a popular choice for web development using Node.js."
    },
    {
      id: uuidv4(),
      username: "MongoDB",
      content: "MongoDB is a NoSQL database that stores data in JSON-like documents.",
      description: "MongoDB is designed for high availability and scalability. Instead of storing data in tables, MongoDB stores data in flexible, JSON-like documents, making it easy to work with unstructured data. It is highly scalable, supports replication, and is well-suited for handling large volumes of data."
    },
    {
      id: uuidv4(),
      username: "NodeJS",
      content: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
      description: "Node.js allows developers to use JavaScript for server-side scripting, running scripts server-side to produce dynamic web page content. It is non-blocking, event-driven, and efficient, making it a popular choice for developing scalable network applications. It’s ideal for real-time applications like chat and streaming services."
    },
    {
      id: uuidv4(),
      username: "MySQL",
      content: "MySQL is a database system that helps store, manage, and organize data using SQL.",
      description: "MySQL is a free tool that helps store and manage data in tables. It uses a language called SQL to easily add, change, or remove data. It’s commonly used for websites and apps because it's fast and reliable."
    },
    
  ];
  

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username , content}=req.body;
    let id = uuidv4()
    posts.push({id ,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
});

// app.patch("/posts/:id",(req,res)=>{
//      let {id } = req.params;
//      let { newContent } = req.body.content;
//      let post = posts.find((p)=> id === p.id); 
//      post.content = newContent;
//      res.redirect("/posts");
// })
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { content } = req.body; // get content from the form
  let post = posts.find((p) => id === p.id); // find the post
  post.content = content; // update the post's content
  res.redirect("/posts");
});


app.get("/posts/:id/edit",(req,res)=>{
  let { id } = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
  let { id } = req.params;
  posts = posts.filter((p)=> id!== p.id);
  res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})