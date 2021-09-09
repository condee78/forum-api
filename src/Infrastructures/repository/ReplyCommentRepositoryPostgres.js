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
      SELECT replies.id, replies.content, replies.date, users.username, replies.is_delete  
      FROM replies
      LEFT JOIN users ON users.id = replies.owner
      WHERE replies.comment_id = $1
      ORDER BY replies.date`,
      values: [commentId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Reply Comment tidak ditemukan");
    }

    const mappedResult = result.rows.map(mapDBToModelReplyCommentDetail);

    return mappedResult;
  }

  async deleteReplyComment(replyId) {
    const query = {
      text: `UPDATE replies set is_delete = '1' WHERE id = $1 RETURNING id`,
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        "Reply Comment gagal dihapus. Id tidak ditemukan"
      );
    }
  }

  async verifyAvailableReplyComment(replyId) {
    const query = {
      text: "SELECT * FROM replies WHERE id = $1",
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError("Reply Comment tidak ditemukan di database");
    }
  }

  async verifyReplyCommentOwner(replyId, owner) {
    const query = {
      text: "SELECT * FROM replies WHERE id = $1",
      values: [replyId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("Reply Comment tidak ditemukan");
    }

    const comment = result.rows[0];
    if (comment.owner !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }
}

module.exports = ReplyCommentRepositoryPostgres;
