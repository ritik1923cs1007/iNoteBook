const moongose=require('mongoose');
const mongoURI='mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const ConnectToMongo=()=>{
    moongose.connect(mongoURI,()=>{
        console.log('Connected sucessfully');
    })
}
module.exports=ConnectToMongo;