import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Container, Typography, Card, CardMedia, CardContent, Box, Button, CircularProgress, 
  Alert, Rating, List, ListItem, ListItemText, Divider 
} from "@mui/material";
import axiosInstance from "../../../Api/axiosInstance";
import { CartContext } from "../../../Context/CartContext";

function imageProgress(course) {
  return course.thumbnail
    ? `data:image/png;base64,${course.thumbnail}`
    : "https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp";
}

// Mock data đánh giá từ học viên
const mockReviews = [
  { id: 1, student: "Nguyễn Văn A", rating: 5, comment: "Khóa học rất hay, hướng dẫn chi tiết!" },
  { id: 2, student: "Trần Thị B", rating: 4, comment: "Nội dung đầy đủ nhưng có vài chỗ hơi nhanh." },
  { id: 3, student: "Lê Hoàng C", rating: 3, comment: "Khóa học ổn, nhưng cần cập nhật thêm bài giảng mới." },
];

const CourseOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPurchased, setIsPurchased] = useState(true);
  const [averageRating, setAverageRating] = useState(4.5);
  const [totalReviews, setTotalReviews] = useState(100);
  const [reviews, setReviews] = useState(mockReviews); // Dùng mock data

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseRes = await axiosInstance.get(`/user-course/course-overview/${id}`);
        setCourse(courseRes.data.course);
        setIsPurchased(courseRes.data.owned);
        setAverageRating(courseRes.data.overview.average_rating)
        setTotalReviews(courseRes.data.overview.total_rating)
        setReviews(courseRes.data.reviews) ;

      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Không tìm thấy khóa học.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <Container sx={{ textAlign: "center", mt: 4 }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ textAlign: "center", mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  const handleAddToCart = () => {
    addToCart(course);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia component="img" height="250" image={imageProgress(course)} alt={course.title} />
        <CardContent>
          <Typography variant="h4" gutterBottom>{course.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary">By {course.author}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{course.description}</Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 2 }}>${course.price?course.price:0}</Typography>

          {/* Hiển thị Rating */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Student Ratings:
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {averageRating&&<Typography variant="body1" fontWeight="bold" sx={{color: "#faaf00" , fontSize:"18px"}}>{Number(averageRating).toFixed(1)}</Typography>}
            <Rating value={averageRating} precision={0.1} readOnly />
          </div>
          <Typography variant="body2" color="text.secondary">
            ({totalReviews} reviews)
          </Typography>

          {isPurchased ? (
            <Button variant="contained" color="success" sx={{ mt: 3 }} onClick={() => navigate(`/courses/${id}`)}>
              Go to Course
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" sx={{ mt: 3, mr: 2 }} onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outlined" color="secondary" sx={{ mt: 3 }} component={Link} to="/cart">
                Go to Cart
              </Button>
            </>
          )}

          <Button variant="contained" color="secondary" sx={{ mt: 3, ml: 2 }} component={Link} to="/courses">
            Back to Courses
          </Button>

          {/* Hiển thị danh sách đánh giá của học viên */}
          <Typography variant="h6" sx={{ mt: 4 }}>
            Student Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Chưa có đánh giá nào cho khóa học này.
            </Typography>
          ) : (
            <List sx={{ mt: 2 }}>
              {reviews.map((review, index) => (
                review.rating && (
                <React.Fragment key={review.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {review.username}
                          </Typography>
                          <Rating value={review.rating} precision={0.5} readOnly />
                        </>
                      }
                      secondary={review.comment}
                    />
                  </ListItem>
                  {index < reviews.length - 1 && <Divider />}
                </React.Fragment>
                )
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default CourseOverview;
