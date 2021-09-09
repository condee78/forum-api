class ReplyCommentRepository {
  async addReplyComment(newReplyComment, owner) {
    throw new Error("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteReplyComment(replyId) {
    throw new Error("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getReplyCommentByCommentId(commentId) {
    throw new Error("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAvailableReplyComment(replyId) {
    throw new Error("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyReplyCommentOwner(replyId, owner) {
    throw new Error("REPLY_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = ReplyCommentRepository;
