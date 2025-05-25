"use client"

import { useEffect, useState } from "react";
import { PulseLoader } from 'react-spinners';

export default function Resultado(){
    const [aiResponse,setAiResponse] = useState("")

    useEffect(() =>{
        const response = localStorage.getItem("RespostadaIa")
        setAiResponse(response)
    },[])
  
    return(
        <div>
  {!aiResponse ? (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <p>Coletando respostas </p><PulseLoader color="#B3B3B3" size={10} />
    </div>
  ) : (
    <p>{aiResponse}</p>
  )}
</div>
    )
}