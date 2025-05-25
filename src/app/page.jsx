"use client"
import "./globals.css";
import { useForm } from "@/context/FormContext";
import { perguntas } from "@/utils/perguntas"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"
export default function Home() {
    const { etapaAtual, loading, proximaPergunta, setResposta: salvarResposta, respostas, submitForms } = useForm()      
    const perguntaAtual = perguntas[etapaAtual]
    const [resposta,setResposta] = useState("")
    const [buttonNext,setButtonNext] =useState(false)
    const [showSubmit ,setshowSubmit] = useState(false)
    const [RespostaLocalStorange,setRespostaLocalStorange] = useState("")
    const router = useRouter()
    useEffect(() =>{
        const resposta = localStorage.getItem("formsubmit")
        console.log(resposta)
        if(resposta){
            router.push('/perguntas')
        }
    },[])


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
              <h3 className={styles.pergunta}>{perguntaAtual?.texto}</h3>
              {!showSubmit?(
                  <div>
                  <textarea
                  type="text"
                  value={resposta}
                  onChange={(e) => setResposta(e.target.value)}
              />
              {buttonNext && (
                  <button onClick={handleNext}>Próxima</button>
              )} 
              </div>
              ):(
                  <button onClick={submitForms} disabled={loading}>
                    {loading ? 'Enviando...' : 'ENVIAR'}
                </button>
              )}    
              
          </div>
      )
}
