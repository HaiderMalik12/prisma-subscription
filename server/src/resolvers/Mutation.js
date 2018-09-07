function createMessage(_, { text, author }, ctx, info) {
  return ctx.db.mutation.createMessage(
    {
      data: {
        text,
        author
      }
    },
    info
  );
}
module.exports = {
  createMessage
};
