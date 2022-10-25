import personService from '../services/persons';
import Person from './Person';

const Persons = ({ persons, removePerson }) => {

    const deleteBtnHandler = (id) => {
        const personToDelete = persons.find(person => person.id === id);
        
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            personService.remove(id);
            removePerson(persons.filter(person => person.id !== id))            
        }
    };
    
    return (
        <>
            {persons.map(person => <Person key={person.name} name={person.name} phoneNumber={person.number} onClick={() => deleteBtnHandler(person.id)}/>)}
        </>
    );    
};

export default Persons;