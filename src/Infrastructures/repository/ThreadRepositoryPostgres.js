const InvariantError = require("../../Commons/exceptions/InvariantError");
const ThreadRepository = require("../../Domains/threads/ThreadRepository");
const { mapDBToModelThread } = require("../utils");

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread, owner) {
    const { title, body } = newThread;
    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner",
      values: [id, title, body, date, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Threads gagal ditambahkan");
    }
    return result.rows.map(mapDBToModelThread)[0];
  }
}

module.exports = ThreadRepositoryPostgres;
