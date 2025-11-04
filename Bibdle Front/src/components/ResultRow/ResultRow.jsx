/* eslint-disable react/prop-types */
import 'animate.css';


function ResultRow ({resultsParams, charOfThePlayer}) {

    const classVisualResult = (resultParam) => {
        if (resultParam === "total coincidence") return "flex items-center justify-center w-45 h-30 bg-green-500 rounded-3xl"
        if (resultParam === "partial coincidence") return "flex items-center justify-center w-45 h-30 bg-yellow-500 rounded-3xl"
        if (resultParam === "no coincidence") return "flex items-center justify-center w-45 h-30 bg-red-500 rounded-3xl" 
    }

    return (
        <div className="flex flex-row justify-center gap-5 !mt-3">
            <p className=" flex items-center justify-center w-30 bg-black rounded-3xl animate__animated animate__flipInY animate__faster">{charOfThePlayer.name}</p>
            <p className={classVisualResult(resultsParams.gender) + " animate__animated animate__flipInY animate__faster "}>{charOfThePlayer.gender}</p>
            <p className={classVisualResult(resultsParams.time) + " animate__animated animate__flipInY animate__faster "}>{charOfThePlayer.time}</p>
            <p className={classVisualResult(resultsParams.role) + " animate__animated animate__flipInY animate__faster "}>{charOfThePlayer.role.join(", ")}</p>
        </div>
    )
}

export default ResultRow;