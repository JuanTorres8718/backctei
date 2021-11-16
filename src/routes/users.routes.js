const router = require("express").Router();
const {
  login,
  registerUser,
  users,
  userEmail,
  updateUser,
  deleteUser,
} = require("../controllers/users.controlller");

//GET ALL USERS
router.get("/api/users", users);

//GET ALL USERS EMAIL
router.get("/api/users_email", userEmail);

//LOGIN
router.post("/api/login", login);

//REGISTER
router.post("/api/register", registerUser);

//UPDATE
router.put("/api/editUser/:codigo_usuario", updateUser);

//DELETE
router.delete("/api/userDelete/:codigo_usuario", deleteUser);

module.exports = router;
