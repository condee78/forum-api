class CommentsHandler {
  constructor({ addCommentUseCase, deleteCommentUseCase }) {
    this._addCommentUseCase = addCommentUseCase;
    this._deleteCommentUseCase = deleteCommentUseCase;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const addedComment = await this._addCommentUseCase.execute(
      request.payload,
      request.headers.authorization,
      request.params
    );

    const response = h.response({
      status: "success",
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request, h) {
    await this._deleteCommentUseCase.execute(
      request.headers.authorization,
      request.params
    );

    const response = h.response({
      status: "success",
    });
    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;
