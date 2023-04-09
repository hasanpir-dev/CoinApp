const isLiked = (user_id, likes) => {
  return likes.some((like) => like === user_id);
};

export default isLiked;
