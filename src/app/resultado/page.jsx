"use client"

import { useEffect, useState } from "react";

export default function Resultado(){
    const [aiResponse,setAiResponse] = useState("")

    useEffect(() =>{
        const response = localStorage.getItem("RespostadaIa")
        setAiResponse(response)
    },[])
  
    return(
        <div>
            {!aiResponse ? (
                <p>Coltedando respostas...</p>
            ):(
                <p>{aiResponse}</p>
            )}

        </div>
    )
}