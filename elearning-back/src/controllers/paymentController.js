import Stripe from 'stripe';
import * as userCourseModel from '../models/userCourseModel.js'; // Import các hàm từ model

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, courseIds } = req.body;
    const userId = req.user.id ;

    // Kiểm tra đầu vào
    if (!userId || !Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({ error: 'Thiếu userId hoặc danh sách courseIds không hợp lệ.' });
    }

    // Xử lý đơn hàng miễn phí
    if (amount === 0) {
      try {
        const results = [];
        for (const courseId of courseIds) {
          // Kiểm tra xem user đã đăng ký khóa học này chưa
          const existing = await userCourseModel.getUserCourse(userId, courseId);
          if (!existing) {
            const newRecord = await userCourseModel.createUserCourse(userId, courseId);
            results.push({ courseId, status: 'enrolled', record: newRecord });
          } else {
            results.push({ courseId, status: 'already enrolled' });
          }
        }
        return res.status(200).json({ freeOrder: true, results });
      } catch (error) {
        console.error('Lỗi khi xử lý đơn hàng miễn phí:', error);
        return res.status(500).json({ error: 'Lỗi khi xử lý đơn hàng miễn phí.' });
      }
    }

    // Tạo PaymentIntent cho đơn hàng có giá trị
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { userId: String(userId), courseIds: courseIds.join(',') }, // Lưu thông tin bổ sung
    });

      

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Lỗi khi tạo PaymentIntent:', error);
    res.status(400).json({ error: error.message, note: "Không thể tạo Payment Intent" });
  }
};
