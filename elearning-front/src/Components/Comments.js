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
  IconButton,
} from '@mui/material';
import { Delete, Edit, Save, Close } from '@mui/icons-material';
import axiosInstance from '../Api/axiosInstance';

const Comments = ({ courseId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/${courseId}`);
      setComments(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
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

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleSaveEdit = async (commentId) => {
    try {
      await axiosInstance.patch(`/comments/${commentId}`, {
        content: editingContent,
      });
      setEditingCommentId(null);
      setEditingContent('');
      fetchComments();
    } catch (err) {
      console.error('Error updating comment:', err);
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
              secondary={
                <>
                  {editingCommentId === comment.comment_id ? (
                    <>
                      <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <Box mt={1}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleSaveEdit(comment.comment_id)}
                          startIcon={<Save />}
                          sx={{ mr: 1 }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={handleCancelEdit}
                          startIcon={<Close />}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      {comment.content}
                      {comment.user_id == userId && (
                        <>
                          <IconButton
                            onClick={() =>
                              handleEdit(comment.comment_id, comment.content)
                            }
                            aria-label="edit"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDelete(comment.comment_id)}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      )}
                    </>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Comments;
