
import compareCharacters from "../utils/compareCharacters.js";

const compareChars = (req, res) => {

    const characterOfThePlayer = req.body;
    
    const characterOfTheDay = {
        label:'Noé', 
        name: 'Noé', 
        gender: 'Masculino', 
        time: 'Antiguo Testamento', 
        role: ['Profeta/Profetisa'], 
        hint: 'Dios le encomendó una construcción' 
      };  // escogerlo cada 24 horas :D

    // Hacer comparación
    const compareResult = compareCharacters(characterOfThePlayer, characterOfTheDay)

    res.send(compareResult);

    // Devolver los indicadores para que el front muestre dinámicamente los resultados :D
}


export { compareChars }