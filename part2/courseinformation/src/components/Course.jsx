import Header from "../components/Header"
import Content from "../components/Content"
import Total from "./Total"

const Course = ({ course }) => {

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total sum={
                course.parts.reduce((sum, part) => sum + part.exercises, 0)
            }/>
        </div>
    )
}

export default Course
