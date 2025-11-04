/* eslint-disable react/prop-types */
import './SearchBar.css'
import Select from 'react-select'
import { useState } from 'react'


// Estilos/configs para la barra de búsqueda
const customStyles = {
    dropdownIndicator: () => ({
        display: 'none' // Eliminar la flechita
    }),
    indicatorSeparator: () => ({
        display: 'none' // Eliminar el separador
    }),
    control: (provided, state) => ({
        ...provided,
        width: '300px',
        cursor: 'text',
        borderColor: 'rgb(255, 225, 143)',
        boxShadow: state.isFocused ? '0 0 0 2px rgb(255, 244, 213)' : 'transparent',
        ':hover':{
            borderColor: 'rgb(255, 203, 107)' // Cambiar el color del borde al estar enfocado
        } // Cambiar el color del borde al estar enfocado
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isFocused ? '#3a2a15' : '#826033',
        backgroundColor: state.isFocused ? '#FFF8E3' : 'white',
        ':active' : {
          backgroundColor: '#FFECB9'
        }
      })
}

function SearchBarAuto ({characters, handleCharactersTried, handleCompareResults, isDisabled}) {

    const [actualCharacters, setActualCharacters] = useState([...characters])

    const updateCharactersList = (characterSelected) => {
        const updatedList = actualCharacters.filter(character => character.name !== characterSelected.name)
        setActualCharacters(updatedList)
        handleCharactersTried(characterSelected)
    }

    const compareCharacters = async (characterSelected) => {

        try {
            const response = await fetch("http://localhost:4001/characterOfTheDay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(characterSelected)
            });
            const result = await response.json();
            handleCompareResults(result);
        } catch (error) {
            console.error("Error en el fetch: " + error)
        }

    }

    return (
        <div>
            <Select
            placeholder="Ingresa el personaje bíblico"
            styles={customStyles}
            options={actualCharacters}
            value={null}
            onChange={async (option) => {
                await compareCharacters(option)
                updateCharactersList(option)
            }}
            isDisabled={isDisabled}
            />
        </div>
        
    )
}

export default SearchBarAuto;
