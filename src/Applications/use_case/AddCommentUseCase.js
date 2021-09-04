const NewComment = require("../../Domains/comments/entities/NewComment");

class AddedCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseAuthentication, useCaseParams) {
    const newComment = new NewComment(
      useCasePayload,
      useCaseParams,
      useCaseAuthentication
    );
    const accessToken = newComment.authentication;

    const { id } = await this._authenticationTokenManager.decodePayload(
      accessToken
    );

    await this._threadRepository.verifyAvailableThread(newComment.threadId);

    return this._commentRepository.addComment(newComment, id);
  }
}

module.exports = AddedCommentUseCase;
