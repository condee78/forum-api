const DeleteComment = require("../../Domains/comments/entities/DeleteComment");

class DeleteCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
    authenticationTokenManager,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCaseAuthentication, useCaseParams) {
    const deleteComment = new DeleteComment(
      useCaseParams,
      useCaseAuthentication
    );
    const accessToken = deleteComment.authentication;

    const { id } = await this._authenticationTokenManager.decodePayload(
      accessToken
    );

    await this._threadRepository.verifyAvailableThread(deleteComment.threadId);

    await this._commentRepository.verifyCommentOwner(
      deleteComment.commentId,
      id
    );

    return this._commentRepository.deleteComment(deleteComment.commentId);
  }
}

module.exports = DeleteCommentUseCase;
