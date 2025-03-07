import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
// routes
import authRoutes from "./src/routes/authRoutes.js";
import courseRoutes from "./src/routes/courseRoutes.js"
import courseSectionRoutes from "./src/routes/courseSectionRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import paymentRoutes from "./src/routes/paymentRoutes.js"
import userCourseRoutes from './src/routes/userCourseRoutes.js';
import chatBotRoutes from './src/routes/chatBotRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js'

// Stripe 
import stripeRoutes from "./src/routes/stripeRoutes.js"







const app = express()
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));


app.use('/webhook',stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses" , courseRoutes) ;
app.use("/api/course_sections" , courseSectionRoutes) ;
app.use("/api/users",userRoutes)
app.use('/api/payments', paymentRoutes);
app.use('/api/user-course', userCourseRoutes);
app.use('/api/chatbot', chatBotRoutes) ;
app.use('/api/comments', commentRoutes) ;



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


