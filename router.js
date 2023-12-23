const fs = require('fs')
const url = require('url')
const {
    userLogin,
    getUser,
    getAssets,
    getFeature
} = require('./controllers/getController')


const router = (req, res)=>{
    console.log("Request made....")
    switch(req.method){
        case 'GET':
            get(req,res)
            break;

        case 'POST':
            post(req,res)
            break;

        case 'DELETE':
            delet(req,res)
            break;

        case 'UPDATE':
            update(req,res)
            break;

        case 'PUT':
            put(req,res)
            break;

        default:
            res.end("method unknown")
    }
}

/// ------- the different end points-----------
/// /login - post  --> to login the user
/// /logout - post --> to logout the user
/// /user/:id - get --> to get the user data
/// /public-static/:name - get --> to get the assets
/// /asset/:id - get --> for getting the feature data


const get = (req,res)=>{
    switch(url.parse(req.url, true).pathname){
        case '/user':
            console.log("...fetching users")
            getUser(req,res)
            break;

        case '/feature':
            getFeature(req, res)
            break;
        
        case '/asset':
            getAssets(req, res)
            break;

        case '/login':
            userLogin(req,res)
            break;
        
        default :
            res.write(`<h1>Your request for: ${req.url}  <b>Not Found</b></h1>`)    
            res.end()
            break;
    }
}

const post = (req,res)=>{
    res.write("this is post: "+req.url)
    res.end()
}

const put = (req,res)=>{}
const update = (req,res)=>{}
const delet = (req,res)=>{}

module.exports = {router}