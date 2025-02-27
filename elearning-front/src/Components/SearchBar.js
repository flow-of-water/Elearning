import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from "../Api/axiosInstance"
import { useNavigate, useLocation } from "react-router-dom";


const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    if (query.trim() === '') {
      navigate('/courses');
      return;
    }
    try {
      const response = await axiosInstance.get(`/courses/search?q=${query.trim()}`);
      const data = await response.data;

    // Nếu đã ở CoursesPage, chỉ cập nhật state
    if (location.pathname === "/courses") {
      navigate("/courses", { state: { searchResults: data }, replace: true });
    } else {
      // Nếu đang ở trang khác, chuyển hướng sang CoursesPage
      navigate("/courses", { state: { searchResults: data } });
    }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };



  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400}}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder || "Search..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
            style: { borderRadius: '30px' }, 
            endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
