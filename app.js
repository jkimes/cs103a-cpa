const mongoose = require('mongoose')
const Movie = require("./models/Movie")
const Item = require("./models/Item")
const mongodb_URI = "mongodb+srv://Jalon:a@cluster0.xsiln.mongodb.net/Movies"


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("we are connected!!!") });

// *********************************************************** //
//  Loading packages to support the server
// *********************************************************** //
// First we load in all of the packages we need for the server...
const createError = require("http-errors"); // to handle the server errors
const express = require("express");
const path = require("path"); // to refer to local paths

const session = require("express-session"); // to handle sessions using cookies
const debug = require("debug")("personalapp:server");
const layouts = require("express-ejs-layouts");

mongoose.connect(mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// *********************************************************** //
// Initializing the Express server 
// This code is run once when the app is started and it creates
// a server that respond to requests by sending responses
// *********************************************************** //
const app = express();

// Here we specify that we will be using EJS as our view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



// this allows us to use page layout for the views 
// so we don't have to repeat the headers and footers on every page ...
// the layout is in views/layout.ejs
app.use(layouts);

// Here we process the requests so they are easy to handle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// Here we specify that static files will be in the public folder
app.use(express.static(path.join(__dirname, "public")));

// Here we enable session handling using cookies
app.use(
    session({
        secret: "zzbbyanana789sdfa8f9ds8f90ds87f8d9s789fds", // this ought to be hidden in process.env.SECRET
        resave: false,
        saveUninitialized: false
    })
);

run()
async function run () {
    // Movie.insertMany([
    //     { 'title': "Uncharted", 'year': '2022', 'description': "Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor (Sully) Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada" },
    //     { 'title': "The Shining", 'year': '1980', 'description': "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future." },
    //     { 'title': "Over the Hedge", 'year': '2006', 'description': "A scheming raccoon fools a mismatched family of forest creatures into helping him repay a debt of food, by invading the new suburban sprawl that popped up while they were hibernating...and learns a lesson about family himself." },
    //     { 'title': "Spiderman", 'year': '2002', 'description': "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family." },
    //     { 'title': "Spiderman 2", 'year': '2004', 'description': "Peter Parker is beset with troubles in his failing personal life as he battles a brilliant scientist named Doctor Otto Octavius." },
    //     { 'title': "The Avengers", 'year': '2012', 'description': "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity." },
    //     { 'title': "Avengers Endgame", 'year': '2019', 'description': "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe." },
    //     { 'title': "Captin America", 'year': '2011', 'description': "Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a Super-Soldier serum. But being Captain America comes at a price as he attempts to take down a warmonger and a terrorist organization." },
    //     { 'title': "Captin America The Winter Soldier", 'year': '2014', 'description': "As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier." },
    //     { 'title': "Gone Girl", 'year': '2014', 'description': "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent." },
    //     { 'title': "Enemy", 'year': '2013', 'description': "A man seeks out his exact look-alike after spotting him in a movie." },
    //     { 'title': "Logan", 'year': '2017', 'description': "In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety." },
    //     { 'title': "Deadpool", 'year': '2016', 'description':"A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks." },
    //     { 'title': "X", 'year': '2022', 'description': "In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives." },
    //     { 'title': "The Dark Knight", 'year': '2008', 'description': "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
    //     { 'title': "The Matrix", 'year': '1999', 'description': "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence." },
    //     { 'title': "The Shawshank Redemption", 'year': 'abc', 'description': 10 },
    //     { 'title': "The Godfather", 'year': '1972', 'description': "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son." },
    //     { 'title': "Pulp Fiction", 'year': '1994', 'description': "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
    //     { 'title': "Kill Bill", 'year': '2003', 'description': "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her." },
    //   ]);
    
    

   
}
// specify that the server should render the views/index.ejs page for the root path
// and the index.ejs code will be wrapped in the views/layouts.ejs code which provides
// the headers and footers for all webpages generated by this app
app.get("/", async (req, res, next) => {
    try {
        let userId = res.locals.user; // get the user's id
        let items = await Item.find({ userId: userId }); // lookup the user's todo items
        res.locals.items = items; //make the items available in the view
        console.log(items)
        res.render("WishList");
    } catch (error) {
        next(error)
    }
    
});

app.post('/Search/add',
    async(req, res, next) => {
        try {
            const { title, year, description } = req.body; // get title and description from the body
            let data = { title, year,description, } // create the data object
            let item = new Item(data) // create the database object (and test the types are correct)
            await item.save() // save the todo item in the database
            console.log(item.title)
            res.redirect('/') // go back to the todo page
        } catch (e) {
            next(e);
        }
    }
)

app.get("/delete/:itemId",
    
    async(req, res, next) => {
        try {
            const itemId = req.params.itemId; // get the id of the item to delete
            await Item.deleteOne({ _id: itemId }) // remove that item from the database
            res.redirect('/') // go back to the todo page
        } catch (e) {
            next(e);
        }
    }
)

app.get("/completed/:value/:itemId",
    
    async(req, res, next) => {
        try {
            const itemId = req.params.itemId; // get the id of the item to delete
            const completed = req.params.value == 'true';
            await Movie.findByIdAndUpdate(itemId, { completed }) // remove that item from the database
            res.redirect('/todo') // go back to the todo page
        } catch (e) {
            next(e);
        }
    }
)
app.get('/Search',
    // show list of courses in a given subject
    async(req, res, next) => {
        try {
            let userId = res.locals.user; // get the user's id
            let movies = await Movie.find({ userId: userId }); // lookup the user's todo items
            res.locals.movies = movies; //make the items available in the view
            console.log(movies)
            res.render("Search");
        } catch (error) {
            next(error)
        }
    } 
)
app.post('/Search/byTitle',
    // show list of courses in a given subject
    async(req, res, next) => {
        const { title } = req.body;
        const movies = await Movie.find({ title: title})

        res.locals.movies = movies
            //res.json(courses)
        res.render('SearchResults')
    }
)

app.post('/Search/byYear',
    // show list of courses in a given subject
    async(req, res, next) => {
        const { year } = req.body;
        const movies = await Movie.find({ year: year })
        res.locals.movies = movies
            //res.json(courses)
        res.render('SearchResults')
    }
)

app.get('/Search/show/:title',
    // show all info about a course given its courseid
    async(req, res, next) => {
        const { title } = req.params;
        const movie = await Movie.findOne({ title: title })
        res.locals.movie = movie
            //res.json(course)
        res.render('Search')
    }
)


// *********************************************************** //
//  Starting up the server!
// *********************************************************** //
//Here we set the port to use between 1024 and 65535  (2^16-1)
const port = "7000";
app.set("port", port);

// and now we startup the server listening on that port
const http = require("http");
const server = http.createServer(app);

server.listen(port);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

server.on("error", onError);

server.on("listening", onListening);

module.exports = app;


app.get('/upsertDB',
    async(req, res, next) => {
        //await Course.deleteMany({})
        for (m in movies) {
            // console.log(m.title)
            const { title, year, genres, rating, poster } = movies;
            // console.log("Upsert " + m)
            await Movie.findOneAndUpdate({ title, year, genres, rating, poster  }, m, { upsert: true })
        }
        const num = await Movie.find({}).count();
        res.send("data uploaded: " + num)
    }
)