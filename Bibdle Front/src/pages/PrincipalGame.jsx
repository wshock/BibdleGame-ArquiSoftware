import SearchBarAuto from "../components/SearchBar/SearchBarAuto";
import '../styles/PrincipalGame.css';
import characters from "../constants/charactersLogic/characters";
import { useState } from 'react';
import ResultRow from "../components/ResultRow/ResultRow";
import TitlePrincipalGame from "../components/ResultRow/TitlesPrincipalGame";


function PrincipalGame () {

    const [charactersTried, setCharactersTried] = useState([])

    const [compareResults, setCompareResults] = useState([])

    const [isWin, setIsWin] = useState(false);
        
    const handleCharactersTried = (character) => {
        setCharactersTried(prevCharactersTried => [...prevCharactersTried, character])
    }

    const handleCompareResults = (compareResult) => {
        setCompareResults(prevCompareResults => [...prevCompareResults, compareResult])
        const won = Object.values(compareResult).every(value => value === "total coincidence");
        setIsWin(won);
    }

    return(
        <section className="principal-game">
            <h2>Juego Clásico</h2>
            <SearchBarAuto characters={characters} handleCharactersTried={handleCharactersTried} handleCompareResults={handleCompareResults} isDisabled={isWin}/>

            <div className="flex flex-col-reverse">

                {
                    charactersTried.map((character, index) => {
                        return(
                            <ResultRow charOfThePlayer={character} resultsParams={compareResults[index]} key={index} />
                        )
                    })
                }

                {
                    charactersTried.length > 0 && <TitlePrincipalGame />
                }

            </div>
        </section>
    )
}

export default PrincipalGame;

// BIG TODO:
// - Agregar la funcionalidad de que solo el ultimo div agregado sea el que se muestre con animación
// - Desarrollar lógica de comparación en ResultRow y ir estilizando cada div de ResultRow.