class DeleteComment {
  constructor(params, authentication) {
    this._isNullParams(params);
    this._verifyParams(params);
    this._verifyAuthentication(authentication);
    this._verifyBearerAuthentication(authentication);

    const { threadId, commentId } = params;

    this.threadId = threadId;
    this.commentId = commentId;

    this.authentication = authentication.includes("Bearer")
      ? authentication.replace("Bearer ", "")
      : "";
  }

  _isNullParams(params) {
    if (params == null) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyParams({ threadId, commentId }) {
    if (!threadId || !commentId) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof threadId !== "string" || typeof commentId !== "string") {
      throw new Error("DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }

  _verifyAuthentication(authentication) {
    if (authentication == null) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_ANY_AUTHENTICATION");
    }
  }

  _verifyBearerAuthentication(authentication) {
    if (!authentication.includes("Bearer")) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_BEARER_AUTHENTICATION");
    }
  }
}

module.exports = DeleteComment;
