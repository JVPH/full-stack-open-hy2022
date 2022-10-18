const Total = ({ parts }) => {

    // const exercises = parts.map(part => part.exercises);

    // const total = exercises.reduce((previousValue, currentValue) => previousValue+currentValue, 0);

    const total = parts.reduce((previousValue, currentValue) => previousValue+currentValue.exercises, 0)
    return (
        <>
            <p>Total of {total} exercises</p>
        </>
    );
};

export default Total;