import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseCard from "../../../Components/CourseCard";
import { CartContext } from "../../../Context/CartContext";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); 
  const [pageCount, setPageCount] = useState(1) ;

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses?page=${page}`);
        setCourses(response.data.courses);
        setPageCount(response.data.totalPages)
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };
    if (location.state?.searchResults) {
      setCourses(location.state.searchResults);
      setLoading(false);
    } else {
      fetchCourses();
    }
  }, [location.state, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", mt: 4 }}
      />
    </Container>
  );
};

export default CoursesPage;
