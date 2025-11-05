/* eslint-disable react/prop-types */
import './ResultRow.css'

function PhraseResultRow({ characterName, isCorrect }) {
    const backgroundColor = isCorrect ? '#4CAF50' : '#f44336';
    
    return (
        <div className="result-row phrase-result-row" style={{
            backgroundColor: backgroundColor,
            color: 'white',
            padding: '15px 30px',
            margin: '10px 0',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            animation: 'slideIn 0.3s ease-out',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
            {characterName}
        </div>
    )
}

export default PhraseResultRow;
