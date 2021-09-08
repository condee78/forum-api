class RepliesHandler {
  constructor({ addReplyCommentUseCase }) {
    this._addReplyCommentUseCase = addReplyCommentUseCase;

    this.postReplyCommentHandler = this.postReplyCommentHandler.bind(this);
  }

  async postReplyCommentHandler(request, h) {
    const addedReply = await this._addReplyCommentUseCase.execute(
      request.payload,
      request.headers.authorization,
      request.params
    );

    const response = h.response({
      status: "success",
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = RepliesHandler;
