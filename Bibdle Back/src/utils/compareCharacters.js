const compareValues = (value1, value2) => {
    
    if (Array.isArray(value1) && Array.isArray(value2)){
        const commonValues = value1.filter(value => value2.includes(value))
        if (commonValues.length === value2.length && value1.length === value2.length) return "total coincidence";
        if (commonValues.length > 0) return "partial coincidence";
        return "no coincidence";
    }
    if (value1 === value2) return "total coincidence";
    return "no coincidence";
}

const compareCharacters = (character1, character2) => {
    return {
        gender: compareValues(character1.gender, character2.gender),
        time: compareValues(character1.time, character2.time),
        role: compareValues(character1.role, character2.role)
        // Expanding here (only 3 is very low)
    }
}

export default compareCharacters;

