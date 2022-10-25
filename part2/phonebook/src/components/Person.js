const Person = ({ name, phoneNumber, onClick }) => {

    return (
        <p>
            {name} {phoneNumber} 
            <button onClick={onClick}>delete</button> 
        </p>
    );
};

export default Person;