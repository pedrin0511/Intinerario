"use client"

import { perguntas } from "@/utils/perguntas"
import { useForm } from "@/context/FormContext"
import { useEffect, useState } from "react"


export default function Pergunta(){
    const {etapaAtual,proximaPergunta,setResposta:salvarResposta,respostas,submitForms} = useForm()
    const perguntaAtual = perguntas[etapaAtual]
    const [resposta,setResposta] = useState("")
    const [buttonNext,setButtonNext] =useState(false)
    const [showSubmit ,setshowSubmit] = useState(false)
    
    useEffect(() =>{
        if(resposta.length > 2){
        setButtonNext(true)
    }else{
        setButtonNext(false)
    }
    },[resposta])
    
    useEffect(() =>{
        // caso não tenha mais perguntas exibir o botão de fim
    if(etapaAtual >= perguntas.length){
        setButtonNext(false)
        setshowSubmit(true)
        console.log(respostas)
    }
    },[etapaAtual])
    

    const handleNext = () =>{
        salvarResposta(etapaAtual,resposta)
        proximaPergunta()
        setResposta("")
    }
    return(
        <div>
            <h1>{perguntaAtual?.texto}</h1>
            {!showSubmit?(
                <div>
                <input
                type="text"
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
            />
            {buttonNext && (
                <button onClick={handleNext}>Próxima</button>
            )} 
            </div>
            ):(
                <button onClick={submitForms}>
                   ENVIAR
                    </button>
            )}
          
           {/* Quando clicar em enviar fazer a requisição para o backend e ai ir para a pagina de resposta! */}
                
            
        </div>
    )
}