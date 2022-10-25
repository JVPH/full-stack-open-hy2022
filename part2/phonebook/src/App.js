import { useEffect, useState } from 'react';

import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState(false);
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  // console.log('render', persons.length, 'persons');

  const handleSubmit = (e) => {
    e.preventDefault();        
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())){
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name === newName);
        const personUpdated = { ...personToUpdate, number: newPhoneNumber };

        personService
          .update(personToUpdate.id, personUpdated)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`);
            setSuccess(false);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.filter(person => person.name !== newName));
          })
      }
      
    }else{
      const nameObject = { 
        name: newName, 
        number: newPhoneNumber,
      };      
      setPersons(persons.concat(nameObject));   
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setErrorMessage(`Added ${newName}`);
          setSuccess(true);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000)          
          setNewName('');
          setNewPhoneNumber('');    
        });
      
    }    
    
    
  };
  
  const handleNameChange = (e) => {
    setNewName(e.target.value);    
  };

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    if(e.target.value.match(/^\s*$/) === null){
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
      <Notification message={errorMessage} success={success}/>    
      <Filter onChange={handleFilterChange}/>
      <h2>Add a new </h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newPhoneNumber={newPhoneNumber} handlePhoneNumberChange={handlePhoneNumberChange} />
      <h2>Numbers</h2>           
      <Persons persons={peopleToShow()} removePerson={setPersons}/>      
    </div>
  );
};



export default App;