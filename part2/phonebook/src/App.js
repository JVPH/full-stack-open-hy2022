import { useState } from 'react';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState(false);
  const [personsFiltered, setPersonsFiltered] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();        
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to the phonebook`);      
    }else{
      const nameObject = { 
        name: newName, 
        phoneNumber: newPhoneNumber,
      };      
      setPersons(persons.concat(nameObject));      
    }    
    setNewName('');
    setNewPhoneNumber('');    
    
  };
  
  const handleNameChange = (e) => {
    setNewName(e.target.value);    
  };

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    if(e.target.value.match(/^ *$/) === null){
      setPersonsFiltered(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())));
      setFilter(true);      
    }else{
      setFilter(false);
    }   
  }

  const peopleToShow = () => filter ? personsFiltered : persons;

  return (
    <div>
      <h2>Phonebook</h2>      
      <Filter onChange={handleFilterChange}/>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newPhoneNumber={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange} />
      <h2>Numbers</h2>           
      <Persons persons={peopleToShow()} />      
    </div>
  );
};



export default App;