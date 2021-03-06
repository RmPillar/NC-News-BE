const {
  createComment,
  fetchCommentsByArticleId,
  updateCommentVote,
  removeCommentById,
  checkArticleExists
} = require('../models/comments');

exports.postComment = (req, res, next) => {
  const { body } = req;
  const { article_id } = req.params;
  createComment(article_id, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order, limit, p } = req.query;
  Promise.all([
    fetchCommentsByArticleId(article_id, sort_by, order, limit, p),
    checkArticleExists(article_id)
  ])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateCommentVote(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
