console.log("server up" )

var express = require("express"); 
var app = express(); 
var fs = require("fs"); 
// var methodOverride = require("method-override"); 


// app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.urlencoded({extended: false})); 


app.get("/", function(req, res){
    res.send("working or something")
})

app.get("/articles", function(req, res){
    var articles = fs.readFileSync("./articles.json")
        articles = JSON.parse(articles); 
            res.render("articles/index",{myArticles: articles});
}); 

//post
app.get('/articles/new', function(req,res) {
    res.render('articles/new');
});

//post
app.post('/articles', function(req,res) {
    var articles = fs.readFileSync("./articles.json");
    articles = JSON.parse(articles);
    articles.push(req.body);
    fs.writeFileSync('./articles.json', JSON.stringify(articles));
    res.redirect("/articles");
});


//edit 
app.get("/articles/:id/edit", function(req, res){
    var articles = fs.readFileSync("./articles.json");
    articles = JSON.parse(articles); 
    var articleIndex = parseInt(req.params.id);
    res.render("articles/edit", {article: articles[articleIndex], articleId: articleIndex}); 
})

//update 
app.put("/articles:id", function(req, res){
    var article = fs.readFileSync("./articles.json")
    articles = JSON.parse(articles)
    var articleIndex = parseInt(req.params.id);
    articles[articleIndex].title = req.body.title; 
    articles[articleIndex].body = req.body.body; 
    fs.writeFileSync("./articles.json", JSON.stringify(articles));
    res.redirect("/articles/" + articleIndex); 
    
})


app.get("/articles/:id", function(req, res){
    var articles = fs.readFileSync("./articles.json")
    articles = JSON.parse(articles); 
    var articleIndex = parseInt(req.params.id); 
    res.render("articles/show", {myArticles: articles[articleIndex]})
});                 


//delete
app.delete("/articles/:id", function(req, res){
    var articles = fs.readFileSync("./articles.json");
    articles = JSON.parse(articles); 
    articles.splice(parseInt(req.params.id), 1);
    fs.writeFileSync("./articles.json", JSON.stringify(articles));
    res.redirect("/articles"); 
}); 








app.listen(3000); 