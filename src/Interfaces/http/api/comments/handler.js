class CommentsHandler {
  constructor({ addCommentUseCase }) {
    this._addCommentUseCase = addCommentUseCase;

    this.postCommentHandler = this.postCommentHandler.bind(this);
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
}

module.exports = CommentsHandler;
