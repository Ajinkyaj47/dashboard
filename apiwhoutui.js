const express= require('express')
const cors = require('cors')
const mongo = require('mongodb')
const bodyparser = require('body-parser')
const mongoClient = mongo.MongoClient
const port = process.env.PORT || 1200
mongoUrl = "mongodb://localhost:27017"
let db
let swaggerUi= require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
let package = require('./package.json')

//collection name
let col_name = "dashboard"
let app = express()


swaggerDocument.info.version=package.version
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

//middleware
app.use(bodyparser.json())
app.use(cors())
app.use(bodyparser.urlencoded({ extended:true }))

//check health
app.get('/health',(req,res)=>{
    res.status(200).send("Health is ok")
})

//get particular user
app.get('/user/:id',(req,res)=>{
    db.collection(col_name).find({_id:mongo.ObjectId(req.params.id)}).toArray((err,result)=>{
        if(err) throw err
        res.status(200).send(result)
    })
})

//get users
app.get('/users',(req,res)=>{
    let query = {isActive:true}

    if(req.query.isActive=="false"){
        query={isActive : false}
    }

    console.log(query)
    
    if(req.query.city && req.query.role){
        query={city:req.query.city, role:req.query.role,isActive:true}
    }else if (req.query.role){
        query={role:req.query.role,isActive:true}
    }else if (req.query.city){
        query={city:req.query.city,isActive:true}
    }

    db.collection(col_name).find(query).toArray((err,data)=>{
        if(err) throw err
        res.status(200).send(data)
    })
})

//add users
app.post('/addUser',(req,res)=>{
    db.collection(col_name).insert((req.body),(err,result)=>{
        if(err) throw err
        res.status(200).send(result)
    })
})

//update user
app.put('/updateUser',(req,res)=>{
    db.collection(col_name).updateOne(
        {
            _id: mongo.ObjectId(req.body._id)
        },
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true
            }
        },
        (err, result) => {
            if(err) throw err
            res.status(200).send(result)
        }
    )
})

//hard delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).remove(
        {
            _id:mongo.ObjectId(req.body._id)
        },
        (err, result) => {
            if(err)throw err
            res.status(200).send(result)
        }
    )
})

//soft delete
app.put('/deactivateUser',(req,res) => {
     db.collection(col_name).updateOne(
        {
            _id:mongo.ObjectId(req.body._id), 
        },
        {
            $set:{
                isActive: false,
            }
        },
        (err,result) => {
            if(err) throw err;
            res.status(200).send(result)
        }        
     )
})

//active user
app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {
            _id:mongo.ObjectId(req.body._id)
        },
        {
            $set:{
                isActive: true
            }
        },
        (err, result) =>{
            if (err) throw err
            res.status(200).send(result)
        }
    )
})

mongoClient.connect(mongoUrl,(err,client)=>{
    if(err) throw err
    db = client.db('ajinkya')
    app.listen(port,(err)=>{
        console.log("Server is listening on port " + port)
    })
})
