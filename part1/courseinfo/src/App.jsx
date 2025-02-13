const Header = (props) => {
  const course = props.course
  return (
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  const name = props.name
  const exercise = props.exercise
  return (
    <p>
      {name} {exercise}
    </p>
  )
}

const Content = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]
  return (
    <>
      <Part name={part1.name} exercise={part1.exercises}/>
      <Part name={part2.name} exercise={part2.exercises}/>
      <Part name={part3.name} exercise={part3.exercises}/>
    </>
  )
}

const Total = (props) => {
  const exercises1 = props.parts[0].exercises
  const exercises2 = props.parts[1].exercises
  const exercises3 = props.parts[2].exercises
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
