import React from "react"
import CourseImage from "./CourseImage"
import { CardContent, Typography, Button, Card } from "@mui/material"
import { Link } from "react-router-dom"

const CourseCard = ({ course }) => {
    return <Card
        sx={{
            height: "440px",
            display: "flex",
            flexDirection: "column",
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
                    height: '60px', // Chiều cao cố định
                    overflow: 'hidden', // Ẩn phần nội dung vượt quá
                    textOverflow: 'ellipsis', // Thêm dấu "..." khi nội dung quá dài
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Giới hạn số dòng hiển thị
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {course.description}
            </Typography>
        </CardContent>
        <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: "auto" }}
            component={Link}
            to={`/courses/overview/${course.id}`}
        >
            more detail
        </Button>
    </Card>
}

export default CourseCard;