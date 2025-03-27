import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import axiosInstance from '../Api/axiosInstance';
import { useParams } from 'react-router-dom';

const Comments = ({courseId}) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/${courseId}`);
      setComments(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setUserId(localStorage.getItem('userId')) ;
    fetchComments();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !userId || !courseId) {
      alert('Please fill all information');
      return;
    }
    try {
      const newComment = { user_id: userId, course_id: courseId, content };
      await axiosInstance.post('/comments', newComment);
      setContent('');
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 4 }} component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows={2}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Send
        </Button>
      </Paper>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.comment_id} alignItems="flex-start">
            <ListItemText
              primary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.username} 
                  </Typography>
                  {' — '}
                  {new Date(comment.created_at).toLocaleString()}
                </>
              }
              secondary={comment.content}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Comments;
