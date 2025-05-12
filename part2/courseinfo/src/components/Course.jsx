const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => {
  return (
  <div>
    {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
  </div>
  )}

const Total = ({total}) => <b>total of {total} exercises</b>

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course
