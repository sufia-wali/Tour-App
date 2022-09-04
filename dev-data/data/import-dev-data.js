const fs = require('fs')
const Tour = require('./../../models/tourModel')
const dotenv = require('dotenv')
dotenv.config({
  path: './config.env'
})

require('./../../db/mongoose')

//read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8'))


//import data into DB
const importData = async()=>{
  try{
    await Tour.create(tours);
    console.log('updated good')
  }catch(err){
    console.log(err);
  }
  process.exit()

}

//delete all data from db
const deleteData = async()=>{
  try{
    await Tour.deleteMany();
    console.log("data deleted");
  }catch(e){
    console.log(e);
  }
  process.exit()

}
if(process.argv[2]==="--import"){
  importData()
}
else if(process.argv[2]==="--delete"){
  deleteData()
}

