const dummy = (blogs) => {
  return 1
}

// Define a new totalLikes function that receives a list of blog posts as
// a parameter. The function returns the total sum of likes
// in all of the blog posts.

// Write appropriate tests for the function. It's recommended to put the tests
// inside of a describe block so that the test report output gets grouped nicely:

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach((element) => {
    likes += element.likes
  })
  return likes
}

module.exports = {
  dummy,
  totalLikes,
}
