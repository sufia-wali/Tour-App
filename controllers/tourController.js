const Tour = require('./../models/tourModel')

const createTour = async(req, res) => {

  try{
  const newTour =await Tour.create(req.body)
    // await newTour.save()
    res.status(201).json({
      status: "success",
      data:{
      tour: newTour
      }
    })
  }catch(error){
    res.status(400).json({
      status: 'fail',
      message: error
    })
  }
};

const getAllTours = async(req, res) => {
  try{
    // building query
    // 1)Filtering
    const queryObj = {...req.query} //shallow copy of query
    //... will get all the values and {} will create a new object with key-value
    //excluding these field from query
    const excludedFields = ['page','sort', 'fields', 'limit'];
    excludedFields.forEach(el=>delete queryObj[el])

    // 2)//Adavanced filtering
    let queryStr = JSON.stringify(queryObj);
     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`)
    console.log(JSON.parse(queryStr))
    // { difficulty: 'easy', duration: { gte: '5' } }

    const query=  Tour.find(JSON.parse(queryStr))

    //Execute query
    const tours = await query

  // const tours = await Tour.find().
  //               where('duration')
  //               .equals(5)
  //               .where('difficulty')
  //               .equals('easy');
    res.status(200).json({
      status: "success",
      results: tours.length,
      data:{
        tours
      }})
  }catch(e){
    res.status(400).json({
      status:"fail",
      message: e})
  }

};

const getTour = async(req, res) => {
  try{
  const tour = await Tour.findById(req.params.id)
  //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: "success",
      data:{
        tour
      }
    })
  }catch(error){
    res.status(401).json({
      status: 'fail',
      message: error
    })
  }
};



const updateTour = async(req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true,runValidators: true})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  }catch(error){
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }

};

const deleteTour = async(req, res) => {
  try{
    await Tour.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success',
      data:null
    });
  }catch(error){
  res.status(404).json({
    status: 'fail',
    message: error
  });
}
};

module.exports={
  createTour,
  getAllTours,
  getTour,
  updateTour,deleteTour
}