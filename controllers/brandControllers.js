const Brand = require("../models/Brand")

exports.createCategory=async(req,res,next)=>{
  
    try{
      const new_category = new Brand({
        ...req.body
      })

      const company = await new_category.save()

      res.status(200).json({
          success : true,
          status : 200,
          message : 'Brand created successfully',
          data : company
      })
    }catch(err){
      res.status(500).json({
          success : false,
          status : 500,
          message : err.message
      })
    }
}

exports.updateCategory=async(req,res,next)=>{
  
  try{
    const company = await Brand.findByIdAndUpdate(req.params.id,{
      $set : {
        name: req.body.name
      }
    },
    {new  : true}
    )

    res.status(200).json({
        success : true,
        status : 200,
        message : 'Brand updated successfully',
        data : company
    })

  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.deleteCategory=async(req,res,next)=>{
  
  try{
    await Brand.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Brand deleted successfully',
        data : {}
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}

exports.getAllCategory=async(req,res,next)=>{
  
  try{
    const companies = await Brand.find({})
    res.status(200).json({
        success : true,
        status : 200,
        message : 'Brands retrieved successfully',
        data : companies
    })
  }catch(err){
    res.status(500).json({
        success : false,
        status : 500,
        message : err.message
    })
  }
}
