import SearchBarAuto from "../components/SearchBar/SearchBarAuto";
import '../styles/PrincipalGame.css';
import characters from "../constants/charactersLogic/characters";
import { useState, useEffect } from 'react';
import PhraseResultRow from "../components/ResultRow/PhraseResultRow";

function PhraseGame () {
    const [charactersTried, setCharactersTried] = useState([])
    const [phraseOfTheDay, setPhraseOfTheDay] = useState("")
    const [correctCharacter, setCorrectCharacter] = useState(null)
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        // Obtener la frase del día desde el backend
        const fetchPhraseOfTheDay = async () => {
            try {
                const response = await fetch("http://localhost:3001/characters/clue", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const result = await response.json();
                console.log(result);
                setPhraseOfTheDay(result.clue);
                setCorrectCharacter(result.name);
            } catch (error) {
                console.error("Error al obtener la frase del día: " + error)
            }
        }

        fetchPhraseOfTheDay();
    }, [])
        
    const handleCharactersTried = (character) => {
        setCharactersTried(prevCharactersTried => [...prevCharactersTried, character])
        
        // Verificar si el personaje es correcto
        if (character.name === correctCharacter) {
            setIsWin(true);
        }
    }

    return(
        <section className="principal-game">
            <h2>Juego de Frases</h2>
            
            {phraseOfTheDay && (
                <div className="phrase-container" style={{
                    backgroundColor: '#FFF8E3',
                    padding: '20px',
                    borderRadius: '10px',
                    margin: '20px 0',
                    border: '2px solid rgb(255, 225, 143)',
                    fontSize: '18px',
                    fontStyle: 'italic',
                    color: '#3a2a15',
                    textAlign: 'center',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    &quot;{phraseOfTheDay}&quot;
                </div>
            )}

            <SearchBarAuto 
                characters={characters} 
                handleCharactersTried={handleCharactersTried} 
                handleCompareResults={() => {}} 
                isDisabled={isWin}
            />

            <div className="flex flex-col-reverse">
                {
                    charactersTried.map((character, index) => {
                        const isCorrect = character.name === correctCharacter;
                        return(
                            <PhraseResultRow 
                                characterName={character.name} 
                                isCorrect={isCorrect} 
                                key={index} 
                            />
                        )
                    })
                }
            </div>

            {isWin && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>
                    ¡Felicitaciones! Has adivinado correctamente.
                </div>
            )}
        </section>
    )
}

export default PhraseGame;
