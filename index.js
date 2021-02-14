const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require("./routes/routes")
const cors = require("cors");
 
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/",router);

app.listen(9000,() => {
    console.log("Servidor rodando")
});
