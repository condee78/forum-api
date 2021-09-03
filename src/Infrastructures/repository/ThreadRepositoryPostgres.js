const InvariantError = require("../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const ThreadRepository = require("../../Domains/threads/ThreadRepository");
const { mapDBToModelThread, mapDBToModelThreadDetail } = require("../utils");

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

  async getThreadById(id) {
    const query = {
      text: `
      SELECT threads.id, threads.title, threads.body, threads.date, users.username 
      FROM threads
      LEFT JOIN users ON users.id = threads.owner
      WHERE threads.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Thread tidak ditemukan");
    }

    return result.rows.map(mapDBToModelThreadDetail)[0];
  }

  async verifyAvailableThread(threadId) {
    const query = {
      text: "SELECT * FROM Threads WHERE id = $1",
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Threads tidak ditemukan di database");
    }
  }
}

module.exports = ThreadRepositoryPostgres;
