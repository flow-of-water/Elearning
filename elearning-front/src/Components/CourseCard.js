import React from "react"
import CourseImage from "./CourseImage"
import { CardContent, Typography, Button, Card, Rating, Box , CardActionArea } from "@mui/material"
import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
    return <Card
        sx={{
            height: "450px",
            display: "flex",
            flexDirection: "column",
        }}
    >
              <CardActionArea
        component={Link}
        to={`/courses/overview/${course.id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <CourseImage course={course} />
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6"
                sx={{
                    mt: 1,
                    overflow: 'hidden', // Ẩn phần nội dung vượt quá
                    textOverflow: 'ellipsis', // Thêm dấu "..." khi nội dung quá dài
                    display: '-webkit-box',
                    WebkitLineClamp: 2, // Giới hạn số dòng hiển thị
                    WebkitBoxOrient: 'vertical',
                }}
            >{course.name}</Typography>
            <Typography variant="subtitle2" color="text.secondary"
                sx={{
                    mt: 1,
                    overflow: 'hidden', // Ẩn phần nội dung vượt quá
                    textOverflow: 'ellipsis', // Thêm dấu "..." khi nội dung quá dài
                    display: '-webkit-box',
                    WebkitLineClamp: 1, // Giới hạn số dòng hiển thị
                    WebkitBoxOrient: 'vertical',
                }}
            >
                by {course.author}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mt: 1,
                    // height: '60px', // Chiều cao cố định
                    overflow: 'hidden', // Ẩn phần nội dung vượt quá
                    textOverflow: 'ellipsis', // Thêm dấu "..." khi nội dung quá dài
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Giới hạn số dòng hiển thị
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {course.description}
            </Typography>
            {/* Rating  */}
            <Box sx={{mt: "1px",display: "flex",alignItems: "center"}}>
                <Rating
                    name="course-rating"
                    value={course.average_rating || 0}
                    precision={0.5}
                    readOnly
                />
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                >
                    ({course.total_rating || 0} ratings)
                </Typography>
            </Box>
            <Typography
            variant="h6"
            color="primary"
          >
            {course.price ? `$${course.price}` : "Free"}
          </Typography>
        </CardContent>
        </CardActionArea>
    </Card>
}

export default CourseCard;