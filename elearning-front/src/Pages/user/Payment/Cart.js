import React, { useContext } from 'react';
import { CartContext } from '../../../Context/CartContext.js';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="Empty Cart"
              style={{ width: '100%', maxWidth: 200, margin: '0 auto' }}
            />
          </Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Your cart is empty.
          </Typography>
          <Typography variant="body1">
            It seems you haven't added any items to your cart yet.
          </Typography>
        </Paper>
      </Container>
    );
  }


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Cart
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {cartItems.map((item) => (
            <Box key={item.id}>
              <ListItem
                secondaryAction={
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item)}
                  >
                    Delete
                  </Button>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price ? item.price : 0} `}
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Total: ${getCartTotal()}</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate("/payment")}>
              Payment
            </Button>
            <Button variant="contained" color="error" onClick={clearCart}>
              Clear All
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CartPage;
