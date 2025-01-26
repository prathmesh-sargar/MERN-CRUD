import express from 'express'

// here we are importing Controllers from controllers folder 
import { create, deleteuser, getAll, getuser, updateuser } from '../controllers/userController.js';
const router = express.Router();

// Here we  create routes of our applications ok 
router.post("/create",create);
router.get("/getall",getAll);
router.get("/getuser/:id",getuser);
router.put("/update/:id",updateuser)
router.delete("/delete/:id",deleteuser);

export default router;
