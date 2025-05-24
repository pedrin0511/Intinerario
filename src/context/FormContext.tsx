"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation"
import { db } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore";

interface Respostas {
    [id:number]:string
}

interface FormcontextType{
    nome:string
    setNome:(nome:string) => void
    etapaAtual: number
    respostas:Respostas
    setResposta: (id:number,resposta:string) => void
    proximaPergunta: () => void
    reiniciar:() => void
    submitForms:() => void
    loading:boolean
    aiResponse:string
    setAiResponse:(resposta:string) => void
}

const formContext = createContext<FormcontextType | undefined>(undefined)

export const FormProvider = ({children}: {children: ReactNode}) => {
    
    const [etapaAtual,setEtapaAtual] = useState(0)
    const [respostas,setRespostas] = useState<string[]>([])
    const [nome,setNome] = useState("")
    const router  =  useRouter()
    const [loading, setLoading] = useState(false)
    const [aiResponse,setAiResponse] = useState("")
    

const setResposta = (id:number,resposta:string) =>{
    setRespostas(prev => {
        const updateRespostas = [...prev]
        updateRespostas[id] = resposta
        return updateRespostas
    })
}

const proximaPergunta = () =>{
    setEtapaAtual(prev => prev + 1)
}

const reiniciar = () =>{
    setEtapaAtual(0)
}

const submitForms = async() =>{
    setLoading(true)

    const RespostasSemNome = respostas.slice(1)
    const nome = respostas[0]
    const idDoc = nome.toLowerCase().replace(/\s/g, "-")
    
    const docRef = doc(db,"respostas" ,idDoc)

    if(!respostas[0]){
        console.error("❌ Nome não fornecido!");
        setLoading(false);
        return;
    }

    try {
      const resposne =  await setDoc(docRef,{
        nome:nome,
        respostas:RespostasSemNome
        })
        
        localStorage.setItem("formsubmit", "Resposta enviada!")
        console.log("respostas salvas")
        router.push("/perguntas")
    } catch (error) {
        console.log(error)
    }finally{
         setLoading(false)
    }

    const submitIaResponse = async() =>{
        
    }


    // try {
    //     const response  =  await fetch('https://intinerario-back.vercel.app/IA/',{
    //      method: 'POST',
    //      headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({payload}),
    //     })
    //     const data = await response.json()

    //     if(data){
    //         console.log(data)
    //         setAiResponse(data.message)
    //         localStorage.setItem("resposta", data.message)
    //     router.push("/perguntas")
    // }
    
    // } catch (error) {
    //      console.error(error);
    // }finally{
    //     setLoading(false)
    // }
}

return(
    <formContext.Provider value={{etapaAtual,respostas,setResposta,proximaPergunta,reiniciar,nome,setNome,submitForms,loading,aiResponse,setAiResponse}}>
        {children}
    </formContext.Provider>
)
}

export const useForm = () =>{
    const context = useContext(formContext)
    
    return context
}