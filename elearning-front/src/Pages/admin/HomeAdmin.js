import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const AdminHome = () => {
  return (
      <div className="container mt-4">
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Card 1 - Số lượng người dùng */}
          <Grid item xs={12} md={4}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">1,250</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 - Số khóa học */}
          <Grid item xs={12} md={4}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6">Total Courses</Typography>
                <Typography variant="h4">35</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 - Số lượt đăng ký */}
          <Grid item xs={12} md={4}>
            <Card className="shadow-sm">
              <CardContent>
                <Typography variant="h6">Total Enrollments</Typography>
                <Typography variant="h4">8,432</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
  );
};

export default AdminHome;
