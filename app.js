const http = require('http')
const {router} = require('./router')

const httpServer = new http.createServer(router);
 http.createServer((req,res)=>{
    
})
httpServer.listen(3000, ()=>{
    console.log('Sever started on port : 3000')
})