const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req,res)=>{
    res.json({msg: '\hello-world'})
})

app.listen(PORT, console.log(`Backend is runnng on port: ${PORT}`))
