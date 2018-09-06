function feed(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: true } }, info);
}
function drafts(parent, args, ctx, info) {
  return ctx.db.query.posts({ where: { isPublished: false } }, info);
}
function post(parent, { id }, ctx, info) {
  return ctx.db.query.post({ where: { id } }, info);
}
function allMessages(parent, { first, orderBy }, ctx, info) {
  return ctx.db.query.messages({ first, orderBy }, info);
}
module.exports = {
  feed,
  drafts,
  post,
  allMessages
};
