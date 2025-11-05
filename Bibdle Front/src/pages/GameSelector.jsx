import { useState } from 'react'
import Select from 'react-select'
import PrincipalGame from './PrincipalGame'
import PhraseGame from './PhraseGame'
import EmojiGame from './EmojiGame'
import '../styles/GameSelector.css'

const gameOptions = [
  { value: 'classic', label: 'Clásico'},
  { value: 'phrase', label: 'Frase'},
  { value: 'emoji', label: 'Emoji'}
]

function GameSelector() {
  const [selectedGame, setSelectedGame] = useState('');

  let gameContent = <div className="game-placeholder">¡Selecciona el tipo de juego!</div>;

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

  return (
    <main className='game-selector-container'>
      <div className="game-selector-header">
        <h2 className='title'>Adivina</h2>
        <h1>El personaje Bíblico</h1>
      </div>

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

export default GameSelector
