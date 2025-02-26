import React from "react";
import { CardMedia } from "@mui/material";

const imageProgress = ({course}) => {
    return course.thumbnail
        ? `data:image/png;base64,${course.thumbnail}`
        : "https://seocom.agency/wp-content/uploads/2024/05/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg.webp";
};

export default function CourseImage(course) {
    return <CardMedia
        component="img"
        height="200"
        image={imageProgress(course)}
        alt={course.name}
    />
}