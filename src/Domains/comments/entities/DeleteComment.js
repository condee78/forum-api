class DeleteComment {
  constructor(authentication) {
    this._verifyAuthentication(authentication);
  }

  _verifyAuthentication(authentication) {
    if (authentication == null) {
      throw new Error("DELETE_COMMENT.NOT_CONTAIN_ANY_AUTHENTICATION");
    }
  }
}

module.exports = DeleteComment;
