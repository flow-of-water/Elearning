import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axiosInstance from "../../Api/axiosInstance";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
/* eslint-disable */
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (formData.username==="") {
      alert("Please enter username");
      return;
    }
    if (formData.password==="") {
      alert("Please enter password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/auth/register", {
        username: formData.username,
        password: formData.password,
      });
  
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed", error);
      alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
      alert(`${formData.username}  ${formData.password}`)
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create Your Account
        </Typography>
      </Box>

      <Box component="form" noValidate mt={3}>
        <TextField fullWidth label="User Name" name="username" onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Password" name="password" type="password" onChange={handleChange} margin="normal" required />
        <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} margin="normal" required />

        <Button fullWidth variant="contained" color="primary" size="large" sx={{ mt: 3 }} onClick={handleRegister}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
