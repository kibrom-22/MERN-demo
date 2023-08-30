var mongoClient = require('mongodb').MongoClient;
var express= require('express');
var cors = require('cors');
var app=express();
const url='mongodb://0.0.0.0:27017';
const dbName='ProductDetail';
mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
   if(err) 
   {
    console.log("connection error:"+err);
   }else{
    console.log("connection successful");
    db=client.db(dbName);
    collection=db.collection('products');
   }
})
app.use(cors());
app.use(express.json());
app.post('/createProduct',(req,res)=>{
    collection.insertOne(req.body,(err,result)=>{
        if(err)
        {
            res.send(err);
        }else{
            res.send('Product Added Successfully!!!');
        }
    })
})
app.get('/products',(req,res)=>{
    collection.find().toArray((err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.json(result);
        }
    });
});
app.listen(4000,()=>console.log("server is running"));