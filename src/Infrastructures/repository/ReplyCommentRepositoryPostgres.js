const InvariantError = require("../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const ReplyCommentRepository = require("../../Domains/replies/ReplyCommentRepository");

const {
  mapDBToModelReplyComment,
  mapDBToModelReplyCommentDetail,
} = require("../utils");

class ReplyCommentRepositoryPostgres extends ReplyCommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReplyComment(newReplyComment, owner) {
    const { content, commentId } = newReplyComment;
    const id = `reply-${this._idGenerator()}`;
    const date = new Date().toISOString();
    const isDelete = "0";

    const query = {
      text: `INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner`,
      values: [id, content, date, owner, commentId, isDelete],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Reply Comment gagal ditambahkan");
    }
    return result.rows.map(mapDBToModelReplyComment)[0];
  }

  async getReplyCommentByCommentId(commentId) {
    const query = {
      text: `
      SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete  
      FROM comments
      LEFT JOIN users ON users.id = comments.owner
      WHERE comments.thread_id = $1
      ORDER BY comments.date`,
      values: [commentId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Reply Comment tidak ditemukan");
    }

    const mappedResult = result.rows.map(mapDBToModelReplyCommentDetail);

    return mappedResult;
  }
}

module.exports = ReplyCommentRepositoryPostgres;
