import { fastify } from "fastify"
import { DatabaseMemory } from "./database-memory.js"
import cors from '@fastify/cors'

const server = fastify()
const database = new DatabaseMemory()


await server.register(cors, {
    // "content-type": "application/json",
    // "access-control-allow-origin": 'http://127.0.0.1:5500',
    // "connection": "keep-alive",
    // "accept": "*/*"
    // origin: "*",
})

server.post('/users', (req, res) => {

    const { name, email, born } = req.body

    database.create({
        name,
        email,
        born
    })

    // 201: algo foi criado
    return res.status(201).send({ msg: "ok" })
})


server.get('/', (req, res) => {
    // req.headers = {
    //     "content-type": "application/json",
    //     "access-control-allow-origin": 'http://127.0.0.1:5500',
    //     "connection": "keep-alive",
    //     "accept": "*/*"
    // }
    res.send("ok")
    return JSON.stringify({ msg: "welcome!" })
})

server.get('/users', (req, res) => {
    res.send(database.list())
    return database.list()
})

server.get('/user/:id', (req, res) => {
    const userId = req.params.id

    const userById = database.list().filter(user => {
        return user.id === userId
    })

    res.send(userById)
    return userById
})


server.put('/user/:id', (req, res) => {

    const { name, email, born } = req.body

    const userId = req.params.id
    database.update(userId, {
        name, email, born
    })
    // resposta teve sucesso mas n tem conteudo na resposta
    return res.status(204).send()
})

server.delete('/user/:id', (req, res) => {
    const userId = req.params.id
    database.delete(userId)

    res.send(`deletado: ${userId}!`)
    return "ok deletado"
})


server.listen({
    port: 3333
})