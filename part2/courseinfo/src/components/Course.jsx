const Header = ({ course }) => <h1>{course.name}</h1>
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <p> 
        <strong>
          Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </strong>
      </p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  )
}

export default Course