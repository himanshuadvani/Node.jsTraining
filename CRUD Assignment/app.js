const express=require('express');

const app=express();
const routes=require('./routes');


require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', routes);
port=process.env.PORT || 5300;
app.listen(port, () => console.log('Server started at port '+port));

