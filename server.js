const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();


const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "19935ert7",
  database: "qna_app"
});

connection.connect(err => {
    if(err) throw err;

    console.log(`SQL connected`);
});

app.get('/', (req, res)=>{
    res.redirect('/questions');
});
app.get('/questions', (req, res)=>{
    connection.query(`SELECT * FROM questions`, (err, questions)=>{
        if(err) throw err;
        console.log(questions);
        const data = {
            quest: [...questions]
        }
        res.render('questions', data);
    });
    
});
app.get('/questions/new', (req, res)=>{
    res.render('newquestion');
});

app.post('/api/questions', (req, res)=> {
    const user = req.body.user;
    const question = req.body.question;
    console.log(`User ${user} Q: ${question}`);
    connection.query(`INSERT INTO questions(question, user) VALUES (?, ?);`, [user, question], (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
      
   
});
app.get("/questions/:id", (req, res)=>{
    res.render('comment');
});
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  