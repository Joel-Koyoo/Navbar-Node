const express = require("express");
const ejs = require("express-ejs-layouts");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override")
const flash = require("connect-flash");
const MemoryStore = require("memorystore")(session);

// activating express
const app = express();


const { route } = require("./server/routes/index");


// body-parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride("_method"))

// setting up sessions || memoryStore
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    cookie: { 
		secure: true,
		maxAge: 60000 
	},
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  }));
  app.use(flash());

// setting up ejs & Layouts
app.use(ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", path.join(__dirname, "views/layouts/main"));



// setting up static files (imgs, css, js)
app.use(express.static(path.join(__dirname, "public")))

// routes middleware
// index router home page
app.use("/", require("./server/routes/index"));

// course router
app.use("/", require("./server/routes/course"));

const port = process.env.PORT || 8080;

app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
});