const mapDBToModelThread = ({ id, title, owner }) => ({
  id,
  title,
  owner,
});

const mapDBToModelComments = ({ id, content, owner }) => ({
  id,
  content,
  owner,
});

module.exports = {
  mapDBToModelThread,
  mapDBToModelComments,
};
