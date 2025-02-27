// controllers/courseController.js
import { getCourses, getCourseById, updateCourse, addCourse, deleteCourse, searchCourses, getPaginatedCourses , updateCoursePartial } from "../models/courseModel.js";
import { deleteSectionsByCourseId } from "../models/courseSectionModel.js";

function ImgArrayToBase64(courses) {
  return courses.map(course => {
    if (course.thumbnail) {
      // Kiểm tra xem course.thumbnail có phải là Buffer không
      if (Buffer.isBuffer(course.thumbnail)) {
        course.thumbnail = course.thumbnail.toString("base64");
      }
    }
    return course;
  });
}
function ImgToBase64(course) {
  if (Buffer.isBuffer(course.thumbnail)) {
    course.thumbnail = course.thumbnail.toString("base64");
  }
  return course
}



export const getCoursesController = async (req, res) => {
  try {
    // Lấy page và limit từ query params, với giá trị mặc định
    const page = req.query.page? parseInt(req.query.page) : 1;
    const limit = 6;

    // Tính toán offset
    const offset = (page - 1) * limit;

    // Lấy dữ liệu phân trang từ model
    var { courses, totalItems } = await getPaginatedCourses(limit, offset);
    courses = ImgArrayToBase64(courses)

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalItems / limit);

    // Trả về kết quả cho client
    res.json({
      courses,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Lấy thông tin khóa học theo ID
export const getCourseByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    var course = await getCourseById(id);
    course = ImgToBase64(course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving course" });
  }
};

// Search thông tin khóa học 
export const getCoursesBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    var courses = await searchCourses(q);
    courses = ImgArrayToBase64(courses);
    res.json(courses);
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Cập nhật thông tin khóa học
export const updateCourseController = async (req, res) => {
  const { id } = req.params;
  const updates = req.body ;
  const { name, author, description } = req.body;
  const thumbnail = req.file ? req.file.buffer : null;
  if (req.file) {
    updates.thumbnail = req.file.buffer;
  }

  try {
    // const updatedCourse = await updateCourse(id, name, author, description, thumbnail);
    const updatedCourse = await updateCoursePartial(id,updates) ;
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating course" });
  }
};

// Thêm khóa học mới
export const addCourseController = async (req, res) => {
  const { name, instructor, description } = req.body;
  const thumbnail = req.file ? req.file.buffer : null;
  try {
    const newCourse = await addCourse(name, instructor, description, thumbnail);
    res.status(201).json(newCourse);  // Trả về khóa học mới vừa được thêm
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding new course" });
  }
};

// Xóa khóa học theo ID
export const deleteCourseController = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteSectionsByCourseId(id);
    const deletedCourse = await deleteCourse(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting course" });
  }
};
