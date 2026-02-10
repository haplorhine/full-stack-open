const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach((element) => {
    likes += element.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    throw new Error('blogs is empty')
  }
  let favorite = blogs[0]
  blogs.forEach((blog) => {
    favorite = blog.likes > favorite.likes ? blog : favorite
  })
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
