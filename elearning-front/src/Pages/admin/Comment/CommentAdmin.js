import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";

const CommentAdmin = () => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function Fetch() {
            try {
                // Send the page number as a query parameter to the backend
                const response = await axiosInstance.get(`/comments`, {
                    params: { page } // pass the page number as a query param
                });

                setComments(response.data.comments); // Assuming response has comments data
                setTotalPages(response.data.totalPages); // Assuming response includes total pages info
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        Fetch();
    }, [page]);

    const handleDelete = async (commentId) => {
        try {
            await axiosInstance.delete(`/comments/${commentId}`);
            if (comments.length === 1 && page > 1) {
                setPage(prev => prev - 1); // setPage sẽ trigger useEffect gọi lại API
            } else {
                setComments(comments.filter(comment => comment.id !== commentId)); // 🔧 Cập nhật nếu không cần lùi trang
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Manage Comments</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Create at</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment) => (
                            <TableRow key={comment.id}>
                                <TableCell>{comment.id}</TableCell>
                                <TableCell>{comment.user_id}</TableCell>
                                <TableCell>{comment.content}</TableCell>
                                <TableCell>{new Date(comment.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(comment.id)} color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {comments && comments.length>0 && 
            <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)} // Update page state on page change
                color="primary"
                style={{ marginTop: 20 }}
            />}
        </Container>
    );
};

export default CommentAdmin;
