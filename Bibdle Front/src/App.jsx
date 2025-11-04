
import './App.css'
import PrincipalGame from './pages/PrincipalGame'
import PhraseGame from './pages/PhraseGame'
import EmojiGame from './pages/EmojiGame'
import Select from 'react-select'
import { useState } from 'react'


const gameOptions = [
  { value: 'classic', label: 'Clásico'},
  { value: 'phrase', label: 'Frase'},
  { value: 'emoji', label: 'Emoji'}
]



function App() {

  // Config for the select component

  const [selectedGame, setSelectedGame] = useState('');

  let gameContent = <div>Selecciona el tipo de juego</div>;

  if (selectedGame.value === 'classic'){
    gameContent = <PrincipalGame />
  } else if (selectedGame.value === 'phrase') {
    gameContent = <PhraseGame />
  } else if (selectedGame.value === 'emoji') {
    gameContent = <EmojiGame />
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '200px',
      'paddingLeft': '35px',
      color: '#3a2a15'
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#3a2a15' : '#826033',
      backgroundColor: state.isFocused ? '#FFF8E3' : 'white',
      ':active' : {
        backgroundColor: '#FFECB9'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#826033'
    }),

  }


  // App component

  return (

    <main className='App'>

      <header>BibDle</header>

      <Select
        defaultValue={selectedGame.label}
        onChange={(option) => setSelectedGame(option)}
        options={gameOptions} 
        styles={customStyles}
        placeholder='Juegos'
        isSearchable={false}
      />

      <section className="game">
        {gameContent}
      </section>

    </main>

  )
}

export default App
