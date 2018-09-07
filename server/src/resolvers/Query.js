function allMessages(parent, { first, orderBy }, ctx, info) {
  return ctx.db.query.messages({ first, orderBy }, info);
}
module.exports = {
  allMessages
};
