const InvariantError = require("../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const CommentRepository = require("../../Domains/comments/CommentRepository");

const { mapDBToModelComment, mapDBToModelCommentDetail } = require("../utils");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment, owner) {
    const { content, threadId } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();
    const isDelete = "0";

    const query = {
      text: `INSERT INTO "comments" VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner`,
      values: [id, content, date, owner, threadId, isDelete],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Comment gagal ditambahkan");
    }
    return result.rows.map(mapDBToModelComment)[0];
  }

  async getCommentByThreadId(threadId) {
    const query = {
      text: `
      SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete  
      FROM comments
      LEFT JOIN users ON users.id = comments.owner
      WHERE comments.thread_id = $1
      ORDER BY comments.date`,
      values: [threadId],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Comment tidak ditemukan");
    }

    const mappedResult = result.rows.map(mapDBToModelCommentDetail);

    return mappedResult;
  }

  async deleteComment(commentId) {
    const query = {
      text: `UPDATE comments set is_delete = '1' WHERE id = $1 RETURNING id`,
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Comment gagal dihapus. Id tidak ditemukan");
    }
  }

  async verifyAvailableComment(commentId) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError("Comment tidak ditemukan di database");
    }
  }

  async verifyCommentOwner(commentId, owner) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError("Comment tidak ditemukan");
    }

    const comment = result.rows[0];
    if (comment.owner !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }
}

module.exports = CommentRepositoryPostgres;
