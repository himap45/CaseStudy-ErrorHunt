const express = require('express'); 
const path = require ('path'); 
const cors = require('cors');
const bodyParser=require('body-parser');//Part#1 Point 2
const port=process.env.PORT || 5000;
const nav= [
    {
        link:"/books",
        title:"Books"
    },
    {
        link:"/authors",
        title:"Authors"
    },
    {
        link:"/books/addbook",//Part #2 Point 6
        title:"Add Book"
    },
    {
        link:"/authors/addauthor",//Part #2 Point 6
        title:"Add Author"
    }
]

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter')(nav); //Part #1 Point 3,Part #2 Point 6
const booksRouter = require('./src/routes/booksroute')(nav);//Part #2 Point 6
const authorsRouter = require('./src/routes/authorsroute')(nav);//Part #2 Point 6

const app = new express; //Part#1 Point 1


app.set('views','./src/views'); 
app.set('view engine','ejs'); 

app.use(cors());//Part #2 Point 7
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{});
    
});





app.listen(port,()=>{ //Part#1 Point 5
    console.log("Server Ready on 5000");
});