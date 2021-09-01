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
    const newComment = new NewComment(useCasePayload, useCaseAuthentication);
    const { threadId } = useCaseParams;
    const accessToken = useCaseAuthentication.includes("Bearer")
      ? useCaseAuthentication.replace("Bearer ", "")
      : "";

    const { id } = await this._authenticationTokenManager.decodePayload(
      accessToken
    );

    await this._threadRepository.verifyAvailableThread(threadId);

    return this._commentRepository.addComment(newComment, id, threadId);
  }
}

module.exports = AddedCommentUseCase;
