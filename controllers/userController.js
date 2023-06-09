const User = require("./../models/userModels");
const Category = require("./../models/categoryModel");
const Item = require("./../models/itemModel");

exports.getSingleUsercategory = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path : 'categories',
      populate : {
        path : 'items'
      }
    });

    res.status(200).json({
      status: "Success",
      categories : user.categories
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid ID",
    });
  }
};
