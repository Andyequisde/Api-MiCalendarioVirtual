const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = 3000

let Evento = [
    {
        IdEvento: "a",
        TodosLosDias: "xd",
        FechaInicial: "",
        FechaFinal: "",
        Notificaciones: ""
    },
    {
        IdEvento: "b",
        TodosLosDias: "xdd",
        FechaInicial: "",
        FechaFinal: "",
        Notificaciones: ""
    }
]

app.get('/api/Evento', (pedido, respuesta) =>{
    respuesta.send(Evento)
})

app.get('/api/Evento/:id', (pedido, respuesta) =>{
    let id = pedido.params.id
    let Eventos = Evento.filter(x => x.IdEvento == id)[0]
    respuesta.send(Eventos)
})

app.post('/api/Evento', (pedido, respuesta) =>{
    if (pedido.body.IdEvento != null){
        Evento.push(pedido.body)
        respuesta.send(pedido.body)
    }
    respuesta.send(400)
})

app.put('/api/Evento/:id', (pedido, respuesta) => {
    let id = pedido.params.id
    let Eventos = Evento.filter(x => x.IdEvento == id)[0]
    if(Eventos == null){
        respuesta.status(404).send("F")
        return
    }
    Eventos.TodosLosDias = pedido.body.TodosLosDias
    Eventos.FechaInicial = pedido.body.FechaInicial
    Eventos.FechaFinal = pedido.body.FechaFinal
    Eventos.Notificaciones = pedido.body.Notificaciones
        respuesta.send(Eventos)
})

app.delete('/api/Evento/:id', (pedido, respuesta) => {
    let id = pedido.params.id
    let EventoAEliminar = Evento.filter(x => x.IdEvento == id)[0]
    if (EventoAEliminar == null) {
        respuesta.status(404).send("F")
        return
    }
    let indice = Evento.indexOf(EventoAEliminar)
    Evento.splice(indice, 1)
    respuesta.send("se elimino el Evento")
})

app.listen(port)