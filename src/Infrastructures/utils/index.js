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
        content: `**komentar telah dihapus**`,
      }
    : {
        id: comment.id,
        username: comment.username,
        date: comment.date,
        content: comment.content,
      };

module.exports = {
  mapDBToModelThread,
  mapDBToModelThreadDetail,
  mapDBToModelComment,
  mapDBToModelCommentDetail,
};
