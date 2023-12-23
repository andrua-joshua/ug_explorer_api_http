const fs = require('fs')
const url = require('url')

/// ------- the different end points-----------
/// /login - post  --> to login the user
/// /logout - post --> to logout the user
/// /user/:id - get --> to get the user data
/// /public-static/:name - get --> to get the assets
/// /data/:id - get --> for getting the feature data

const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
const features = JSON.parse(fs.readFileSync('./data/features.json', 'utf-8'))
const usersAuthCredentails = JSON.parse(fs.readFileSync('./data/user_auths.json','utf-8'))

const userLogin = (req, res)=>{
    // requires the users name to be used here
    // username
    // password
    // gmail
    
    try{
        const {gmail, password} = url.parse(req.url, true).query
        let user;

        for(let i =0; i < users.length; i++){
            if(users[i].gmail == gmail){
                user = users[i]
                console.log(`...Username: ${user.username} & \nid: ${user.id}`)
                break;
            }
        }

        let isLoged = false
        for(let i=0; i<usersAuthCredentails.length; i++){
            if(usersAuthCredentails[i].id == user.id 
                && usersAuthCredentails[i].password == password){
                    usersAuthCredentails[i].logedin = true;
                    isLoged = true
                    console.log("user logged in succesfully")
                    res.write('{"success":true}')
                    res.end()
                    break
            }
        }

        if(!isLoged){
            res.write('{"success":false}')
            res.end()
        }
    }catch(err){
        res.writeHead(500)
        res.write("Server error: "+err)
        res.end()
    }
    
}

const userLogout = (req, res)=>{
    
}

const getUser = (req, res)=>{
    const _url = req.url;
    const params = url.parse(_url,true).query

    try{
        const id = params.id
        let isDone = false

        for(let i =0; i<users.length; i++){
            if(users[i].id == id){
                res.setHeader('Content-Type','application/json')
                res.writeHead(201,{'Content-Type':'application/json'})
                res.write(JSON.stringify(users[i]))
                res.end()  
                isDone = true
                break      
            }
        
        }

        if(!isDone){res.write("<h3>Error 404: User not found</h3>")
        res.end()}
    }catch(err){
        res.writeHead(500)
        res.write("Server error")
        res.end()
    }
}

const getFeature = (req, res)=>{
    const _url = req.url;
    const params = url.parse(_url,true).query

    try{
        const id = params.id
        let isDone = false

        for(let i =0; i<features.length; i++){
            if(features[i].id == id){
                res.writeHead(200,{
                    "Content-Type":"application/json"
                })
                res.write(JSON.stringify(features[i]))
                res.end()  
                isDone = true
                break      
            }
        }

        if(!isDone){res.write("<h3>Error 404: Feature not found</h3>")
        res.end()}
        }catch(err){
            res.writeHead(500)
            res.write("Server error")
            res.end()
    }      
}

const getAssets = (req, res)=>{
    const _url = req.url;
    const params = url.parse(_url,true).query

   try{
        const name = params.name 
        const asset = fs.readFileSync(`./public_static/${name}`)

        res.write(asset)
        res.end()
   }catch(err){
        res.writeHead(500)
        res.write('<p style="color:red; font-size: 30px">Error getting asset</p>')
        res.end()
   }
}


module.exports ={
    userLogin,
    getUser,
    getAssets,
    getFeature
}