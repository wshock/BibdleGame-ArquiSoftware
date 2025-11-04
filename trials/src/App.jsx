import React, { useState } from 'react';
import './App.css'; // Asegúrate de importar el archivo CSS

function App() {
  const [divs, setDivs] = useState([]);

  const addDiv = () => {
    setDivs(prevDivs => [
      ...prevDivs,
      { id: prevDivs.length, isNew: true }
    ]);
  };

  const handleAnimationEnd = (index) => {
    setDivs(prevDivs => 
      prevDivs.map((div, i) => 
        i === index ? { ...div, isNew: false } : div
      )
    );
  };

  return (
    <div>
      <button onClick={addDiv}>Agregar Div</button>
      <div className="parent-div">
        {divs.map((div, index) => (
          <div 
            key={div.id} 
            className={div.isNew ? 'animate' : ''} 
            onAnimationEnd={() => handleAnimationEnd(index)}
          >
            Hola
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
