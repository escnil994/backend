const express = require('express')
const cors = require('cors')
require('dotenv').config()



//Create server - app Express
const app = express()

//Public access
app.use( express.static('public'))

//CORS

app.use(cors());

//Body (read and parse)
app.use(express.json())



//RUTAS
app.use('/api/auth', require('./routes/auth'))



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`)
})

