// var http = require('http')
// var module = require("./newModule");
// var url = require('url')
// http.createServer((req,res)=>{
//     var queryObj = url.parse(req.url, true).query;
//     var ans = module.Mymodule(parseInt(queryObj.a),parseInt(queryObj.b))
//     var m = module.Muli(parseInt(queryObj.a),parseInt(queryObj.b))
//     var s = module.sub(parseInt(queryObj.a),parseInt(queryObj.b))
//     var d = module.div(parseInt(queryObj.a),parseInt(queryObj.b))
//     res.write(String(ans))
//     res.write("/n")
//     res.write(String(m))
//     res.write("/n")
//     res.write(String(s))
//     res.write("/n")
//     res.write(String(d))
//     // res.end('hello vb')
// }).listen(8080,()=>{
//     console.log('server running');
// })         

var express = require('express')
var app=express();
var cors = require('cors')
app.use(cors())
const mongo=require('mongoose')
mongo.connect("mongodb://localhost:27017/Expense-tracker")
.then(()=> console.log("Connected to Mongodb"));
  const expenseSchema=new mongo.Schema({
    date:{type: String, required: true},
    category:{type: String, required: true},
    name:{type: String, required: true},
    amount:{type: Number, required: true},
  });
  let Expenses = mongo.model("Expenses",expenseSchema)
   app.use(express.json());   

// var arr=[{name:"Jana"}, {name:"Geetha"}];

app.get('/api', async (req,res) =>{
   const expense= await Expenses.find();
   res.json(expense);
});

app.post("/api", (req,res)=>{
    const {date,category,name,amount} = req.body;
    const newItem= new Expenses({date: new Date().toLocaleDateString(), category, name, amount});
    newItem.save();
    res.status(200).json(newItem);
})


// app.post('/add',(req,res)=>{
//     console.log(req.body)
//     let val1= req.body.num1;
//     let val2= req.body.num2;
//     res.send(String(val1+val2))
// })


app.listen(3001,()=>{
   console.log('server is running')
})