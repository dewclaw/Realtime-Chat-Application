let http = require('http')
let fs = require('fs')
let WebSocket = require('ws')
let index = fs.readFileSync('./index.html');

let server = http.createServer((request,response)=>{
    response.write(index)
    response.end()
}).listen(8000, 'localhost', ()=>{
    console.log("HTTP Server Listening")
})
let wss = new WebSocket.Server({port : 8080}, ()=>{
    console.log("WSS Listening")
});
wss.on('connection', (ws)=>{
    ws.on('message',(message)=>{
        console.log('received : %s', message)
        console.log("Echoing Message Back!")
        ws.send(message)
    })
    ws.send('Something!')
})
wss.on('close', (ws)=>{
    ws.send("Close Connection")
})