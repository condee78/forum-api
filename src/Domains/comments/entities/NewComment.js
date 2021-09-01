class NewComment {
  constructor(payload, authentication) {
    this._isNull(payload);
    this._verifyPayload(payload);
    this._verifyAuthentication(authentication);

    const { content } = payload;

    this.content = content;
  }

  _isNull(payload) {
    if (payload == null) {
      throw new Error("NEW_COMMENT.NOT_CONTAIN_ANY_PROPERTY");
    }
  }

  _verifyPayload({ content }) {
    if (!content) {
      throw new Error("NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof content !== "string") {
      throw new Error("NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }

  _verifyAuthentication(authentication) {
    if (authentication == null) {
      throw new Error("NEW_COMMENT.NOT_CONTAIN_ANY_AUTHENTICATION");
    }
  }
}

module.exports = NewComment;
