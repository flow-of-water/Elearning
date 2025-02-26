// models/courseModel.js
import db from "../config/db.js";


export const getCourses = async () => {
    try {
      const result = await db.query("SELECT * FROM courses");
      return result.rows;  // Trả về thông tin khóa học nếu tìm thấy
    } catch (err) {
      throw new Error("Error courses");
    }
  };
  
// Truy vấn thông tin khóa học theo ID
export const getCourseById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM courses WHERE id = $1", [id]);
    return result.rows[0];  // Trả về thông tin khóa học nếu tìm thấy
  } catch (err) {
    throw new Error("Error retrieving course");
  }
};

// Cập nhật thông tin khóa học (có hỗ trợ cập nhật thumbnail)
export const updateCourse = async (id, name, instructor, description, thumbnail) => {
  console.log(thumbnail)
  try {
    const result = await db.query(
      "UPDATE courses SET name = $1, author = $2, description = $3, thumbnail = $4 WHERE id = $5 RETURNING *",
      [name, instructor, description, thumbnail, id]
    );
    return result.rows[0];  // Trả về khóa học đã được cập nhật
  } catch (err) {
    throw new Error("Error updating course");
  }
};

// Thêm khóa học mới (hỗ trợ lưu thumbnail)
export const addCourse = async (name, instructor, description, thumbnail) => {
  try {
    const result = await db.query(
      "INSERT INTO courses (name, author, description, thumbnail) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, instructor, description, thumbnail]
    );
    return result.rows[0];  // Trả về khóa học đã được thêm
  } catch (err) {
    throw new Error("Error adding new course");
  }
};

// Xóa khóa học theo ID
export const deleteCourse = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return null;  // Không tìm thấy khóa học để xóa
    }
    return result.rows[0];  // Trả về khóa học đã bị xóa
  } catch (err) {
    console.error('Error deleting course:', err); // Ghi chi tiết lỗi
    throw new Error("Error deleting course");
  }
};
