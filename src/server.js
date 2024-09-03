const express = require('express')
const app = express()
const cors = require('cors')
const _var = require('./global/_var')

/*************** Dependency **********/

const routes = require('./routes/payment.routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

/*************** Routes ***********/

app.listen(_var.PORT, (err) => {
    if(err) throw err;
    console.log(`Servidor corriendo en el puerto: http://localhost:${_var.PORT}`);
    
})

app.use(routes)