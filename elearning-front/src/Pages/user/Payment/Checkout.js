import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import PaymentForm from './paymentForm';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [courseIds, setCourseIds] = useState([])

  useEffect(() => {
    // Lấy cartItems từ localStorage (được lưu dưới dạng JSON)
    const items = localStorage.getItem('cartItems');
    if (items) {
      const parsedItems = JSON.parse(items);
      setCartItems(parsedItems);
      // Tính tổng tiền: giả sử mỗi item có cấu trúc { name, price, quantity }
      const total = parsedItems.reduce(
        (sum, item) => {
          const price = (parseFloat(item.price) || 0);
          return sum + price ;
        },0);
      setTotalAmount(total);

      setCourseIds(parsedItems.map((item)=>item.id)) ;
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: $${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Total: ${totalAmount}
            </Typography>
            {/* PaymentForm nhận totalAmount qua props */}
            <PaymentForm totalAmount={totalAmount} courseIds={courseIds} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default CheckoutPage;
