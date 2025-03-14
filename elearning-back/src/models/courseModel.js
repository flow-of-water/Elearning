// models/courseModel.js
import db from "../config/db.js";

// Get Number of courses
export const getNumberOfCourses = async () => {
  const result = await db.query("SELECT COUNT(*) FROM courses");
  return result.rows[0].count;
}

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

// Paging Course
export const getPaginatedCourses = async (limit, offset) => {
  // Truy vấn để lấy danh sách khóa học với limit và offset
  const coursesQuery = `
    SELECT * FROM courses
    ORDER BY id
    LIMIT $1 OFFSET $2
  `;
  const coursesResult = await db.query(coursesQuery, [limit, offset]);

  // Truy vấn để lấy tổng số lượng khóa học
  const countResult = await db.query('SELECT COUNT(*) FROM courses');
  const totalItems = parseInt(countResult.rows[0].count, 10);

  return {
    courses: coursesResult.rows,
    totalItems,
  };
};

// Search thông tin khóa học 
export const searchCourses = async (query) => {
  const searchQuery = `%${query}%`; // Tìm kiếm bất kỳ vị trí nào trong chuỗi
  const result = await db.query(
    `SELECT * FROM courses WHERE name ILIKE $1 OR author ILIKE $1`,
    [searchQuery]
  );
  return result.rows;
};
export const searchCourseInSentences = async (sentence,limit=5) => {
  var query = `SELECT name, price, description, author FROM courses WHERE $1 ILIKE '%' || name || '%'  LIMIT $2 ;`
  const result = await db.query(query,[sentence,limit]) ;
  return result.rows;
}

// PUT Cập nhật thông tin khóa học (có hỗ trợ cập nhật thumbnail) 
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

// PATCH cập nhập thông tin khóa học
export const updateCoursePartial = async (id, updates) => {
  // Tạo mảng chứa các phần của câu lệnh SET
  const setClause = [];
  const values = [];
  let index = 1;

  // Duyệt qua các trường cần cập nhật và tạo câu lệnh SET động
  for (const [key, value] of Object.entries(updates)) {
    setClause.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }

  // Thêm id vào mảng values
  values.push(id);

  // Tạo câu lệnh truy vấn
  const query = `
    UPDATE courses
    SET ${setClause.join(', ')}
    WHERE id = $${index}
    RETURNING *;
  `;

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error executing update query:', error);
    throw error;
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
