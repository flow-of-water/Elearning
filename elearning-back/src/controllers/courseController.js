// controllers/courseController.js
import { getCourses , getCourseById, updateCourse, addCourse, deleteCourse } from "../models/courseModel.js";
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
      var courses = await getCourses();
      courses = ImgArrayToBase64(courses)
      if (!courses) {
        return res.status(404).json({ message: "Courses not found" });
      }
      res.json(courses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error courses" });
    }
  };
// Lấy thông tin khóa học theo ID
export const getCourseByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    var course = await getCourseById(id);
    course = ImgToBase64(course) ;
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving course" });
  }
};

// Cập nhật thông tin khóa học
export const updateCourseController = async (req, res) => {
  const { id } = req.params;
  const { name, author, description } = req.body;
  const thumbnail = req.file ? req.file.buffer : null;

  try {
    const updatedCourse = await updateCourse(id, name, author, description, thumbnail);
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
