import React, { useState, useEffect } from 'react'
import firebaseConfig from '../firebaseConfig'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchProduct = ({setDisabled, item, setItem}) => {

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const setFocus = () => {
    document.getElementById('searchProduct').focus()
  }

  const getProducts = () => {
    // const getOptions = { source: 'cache' };
    const db = firebaseConfig.firestore()
    const query = db.collection('products').orderBy('name')
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
    setFocus(); // eslint-disable-next-line
    getProducts() // eslint-disable-next-line
  },[])



  return (
      <Autocomplete
        disableClearable
        id="searchProduct"
        name="searchProduct"
        onChange={ (event, value) => {
          setItem({ ...item, 'product':{'id': value.id, 'name': value.name }})
          setDisabled(false)
        }}
        getOptionLabel={ (option) => option.name }
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} required label="Produdcto" InputLabelProps={{ shrink: true }} />
        )}
      />
    )

}


export default SearchProduct
