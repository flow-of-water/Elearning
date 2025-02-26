import { getAllUsers, updateUserRole } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  };

export const updateUserRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body ;
    var updatedRole = "admin" ;
    if(role=='admin') updatedRole = 'user' ;

    if (!id) {
      return res.status(400).json({ error: 'Missing userId' });
    }
    const userRole = await updateUserRole(id,updatedRole);
    res.status(200).json(userRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};