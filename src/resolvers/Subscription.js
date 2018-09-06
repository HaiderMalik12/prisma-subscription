function subscribeToNewPost(parent, args, ctx, info) {
  return ctx.db.subscription.post(
    {
      where: {
        mutation_in: ['CREATED']
      }
    },
    info
  );
}
const newPost = {
  subscribe: subscribeToNewPost
};
module.exports = {
  newPost
};
