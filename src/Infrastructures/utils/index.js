const mapDBToModelThread = ({ id, title, owner }) => ({
  id,
  title,
  owner,
});

const mapDBToModelThreadDetail = ({
  id,
  title,
  body,
  date,
  username,
  comments,
}) => ({
  id,
  title,
  body,
  date,
  username,
  comments,
});

const mapDBToModelComment = ({ id, content, owner }) => ({
  id,
  content,
  owner,
});

// eslint-disable-next-line no-confusing-arrow
const mapDBToModelCommentDetail = (comment) =>
  comment.is_delete === "1"
    ? {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        replies: comment.replies,
        content: `**komentar telah dihapus**`,
      }
    : {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        replies: comment.replies,
        content: comment.content,
      };

const mapDBToModelReplyComment = ({ id, content, owner }) => ({
  id,
  content,
  owner,
});

// eslint-disable-next-line no-confusing-arrow
const mapDBToModelReplyCommentDetail = (replyComment) =>
  replyComment.is_delete === "1"
    ? {
        id: replyComment.id,
        content: `**komentar telah dihapus**`,
        date: replyComment.date,
        username: replyComment.username,
      }
    : {
        id: replyComment.id,
        content: replyComment.content,
        date: replyComment.date,
        username: replyComment.username,
      };

module.exports = {
  mapDBToModelThread,
  mapDBToModelThreadDetail,
  mapDBToModelComment,
  mapDBToModelCommentDetail,
  mapDBToModelReplyComment,
  mapDBToModelReplyCommentDetail,
};
