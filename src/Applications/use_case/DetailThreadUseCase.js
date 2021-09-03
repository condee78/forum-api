const DetailThread = require("../../Domains/threads/entities/DetailThread");

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(usecaseParams) {
    const detailThread = new DetailThread(usecaseParams);

    const thread = await this._threadRepository.getThreadById(
      detailThread.threadId
    );

    const comment = await this._commentRepository.getCommentByThreadId(
      detailThread.threadId
    );

    thread.comments = comment;

    return thread;
  }
}

module.exports = DetailThreadUseCase;
