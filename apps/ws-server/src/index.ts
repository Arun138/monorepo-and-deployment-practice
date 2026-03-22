import {WebSocketServer} from 'ws'
import {query} from '@repo/db/query'

const wss = new WebSocketServer({port:8080})

wss.on("connection",(socket) => {
    const uuid = crypto.randomUUID()
    query(`INSERT INTO users (id,username,password) VALUES ($1,$2,$3)`,[uuid,uuid,'passwordWS'])
    socket.send('You are connected to ws server!')
})
