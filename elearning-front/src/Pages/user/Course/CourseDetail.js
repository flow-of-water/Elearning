import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button, Grid } from "@mui/material";
import axios from "axios";
import CourseVideoPlayer from "../../../Components/CourseVideoPlayer";

function imageProgress(course) {
  return course.thumbnail? `data:image/png;base64,${course.thumbnail}`  : "https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp"
}

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseAndSections = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        // Gọi API lấy thông tin khóa học
        const courseRes = await axios.get(`http://localhost:5000/api/courses/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        setCourse(courseRes.data);

        // Gọi API lấy danh sách sections theo courseId
        const sectionsRes = await axios.get(`http://localhost:5000/api/course_sections/course/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        setSections(sectionsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Không tìm thấy khóa học!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndSections();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Không có dữ liệu khóa học.</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia component="img" height="250" image={imageProgress(course)} alt={course.title} />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {course.description}
          </Typography>

          {/* Hiển thị các Course Sections */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Course Sections
          </Typography>
          {sections.length === 0 ? (
            <Typography variant="body2">Chưa có section nào cho khóa học này.</Typography>
          ) : (
            <Grid container spacing={3}>
              {sections.map((section) => (
                <Grid item xs={12} key={section.id}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6">{section.name}</Typography>
                    <Typography variant="body2">{section.description}</Typography>
                    <CourseVideoPlayer url={section.video_link} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Back Button */}
          <Button variant="contained" color="secondary" sx={{ mt: 3 }} component={Link} to="/courses">
            Back to Courses
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CourseDetail;
