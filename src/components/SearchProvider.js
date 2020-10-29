import React, { useState, useEffect } from 'react'
import firebaseConfig from '../firebaseConfig'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchProvider = ({ disabled, item, setItem }) => {

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const getProviders = () => {
    // const getOptions = { source: 'cache' };
    const db = firebaseConfig.firestore()
    const query = db.collection('providers').orderBy('name')
    query.get()
    .then( (querySnapshot) => {
      console.log("Se ejecuto la consulta")
      if (querySnapshot.size !== 0) {
        const docs = []
        querySnapshot.forEach((doc, i) => {
          docs.push({id:doc.id, ...doc.data()})
        });
        setOptions(docs);
      }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  useEffect( () => {
    // Fijo el foco en el primer compnentes
    getProviders() // eslint-disable-next-line
  },[])

  return (
      <Autocomplete
        disabled={disabled}
        disableClearable
        id="provider"
        name="provider"
        onChange={ (event, value) => {
          setItem({ ...item, 'provider':{'id': value.id, 'name': value.name } })
        }}
        getOptionLabel={ (option) => option.name }
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} required label="Proveedor" InputLabelProps={{ shrink: true }} />
        )}
      />
    )

}


export default SearchProvider
