import db from "../models/index";
import CRUDservice from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let allUsers = await CRUDservice.createNewUser(req.body);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId);

    // check user data not found
    return res.render("editCRUD.ejs", {
      userData: userData,
    });
  } else {
    return res.send("User's not found!");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDservice.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let allUsers = await CRUDservice.deleteUserById(userId);
    return res.render("displayCRUD.ejs", {
      dataTable: allUsers,
    });
  } else {
    return res.send("User's not found!");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
