const InvariantError = require("../../Commons/exceptions/InvariantError");
const CommentRepository = require("../../Domains/comments/CommentRepository");
const { mapDBToModelComments } = require("../utils");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment, owner, threadId) {
    const { content } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: `INSERT INTO "comments" VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner`,
      values: [id, content, date, owner, threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Comment gagal ditambahkan");
    }
    return result.rows.map(mapDBToModelComments)[0];
  }
}

module.exports = CommentRepositoryPostgres;
