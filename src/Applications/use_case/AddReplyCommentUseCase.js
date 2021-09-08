const NewReplyComment = require("../../Domains/replies/entities/NewReplyComment");

class AddReplyCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    replyCommentRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._replyCommentRepository = replyCommentRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseAuthentication, useCaseParams) {
    const newReplyComment = new NewReplyComment(
      useCasePayload,
      useCaseParams,
      useCaseAuthentication
    );
    const accessToken = newReplyComment.authentication;

    const { id } = await this._authenticationTokenManager.decodePayload(
      accessToken
    );

    await this._threadRepository.verifyAvailableThread(
      newReplyComment.threadId
    );
    await this._commentRepository.verifyAvailableComment(
      newReplyComment.commentId
    );

    return this._replyCommentRepository.addReplyComment(newReplyComment, id);
  }
}

module.exports = AddReplyCommentUseCase;
