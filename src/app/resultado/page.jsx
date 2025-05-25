"use client"

import { useEffect, useState } from "react";
import { PulseLoader } from 'react-spinners';
import styles from './index.module.css'
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
      <p style={{fontSize:"1.5rem"}}>Coletando respostas </p><PulseLoader color="#B3B3B3" size={10} />
    </div>
  ) : (
    <div className={styles.resposta}>
        <p style={{fontSize:"1.5rem"}}>{aiResponse}</p>
    </div>
    
  )}
</div>
    )
}