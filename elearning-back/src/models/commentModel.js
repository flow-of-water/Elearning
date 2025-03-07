import db from "../config/db.js";

export const getAllComments = async () => {
    const res = await db.query('SELECT * FROM comments');
    return res.rows;
};

export const createComment = async (user_id, course_id, content) => {
    const res = await db.query(
        'INSERT INTO comments (user_id, course_id, content) VALUES ($1, $2, $3) RETURNING *',
        [user_id, course_id, content]
    );
    return res.rows[0];
};

export const deleteComment = async (id) => {
    const res = await db.query('DELETE FROM comments WHERE comment_id = $1', [id]);
    return res.rowCount > 0;
};

export const getDetailCommentsByCourseId = async (id) => {
    const query = `
    SELECT
      comments.*,
      users.username 
    FROM
      comments
    INNER JOIN
      users ON comments.user_id = users.id
    WHERE comments.course_id = $1
  `;
    const res = await db.query(query,[id]);
    return res.rows;
}