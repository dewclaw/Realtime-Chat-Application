let http = require('http')
let fs = require('fs')
let WebSocket = require('ws')
let index = fs.readFileSync('./index.html');
let chatLog = []

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
    
    for(var i = 0; i < chatLog.length; i++){
        ws.send(chatLog[i])
    }
    console.log(chatLog)
    
    ws.on('message',(message)=>{
        console.log('received : %s', message)
        console.log("Echoing Message Back!")
        console.log(wss.clients)
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })

        chatLog.push(message);
        // ws.send(`${chatLog[chatLog.length - 1]}`)
    })
    ws.send('---------- Chat Server Established -------- ')
})
wss.on('close', (ws)=>{
    ws.send("Close Connection")
})