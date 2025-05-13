"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation"

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
}

const formContext = createContext<FormcontextType | undefined>(undefined)

export const FormProvider = ({children}: {children: ReactNode}) => {
    const [etapaAtual,setEtapaAtual] = useState(0)
    const [respostas,setRespostas] = useState<Respostas>({})
    const [nome,setNome] = useState("")
    const router  =  useRouter()
const setResposta = (id:number,resposta:string) =>{
    setRespostas(prev =>({
        ...prev, [id]:resposta
    }))
}

const proximaPergunta = () =>{
    setEtapaAtual(prev => prev + 1)
}

const reiniciar = () =>{
    setEtapaAtual(0)
}

const submitForms = async() =>{
    const payload ={nome,respostas}
    console.log(payload)
    if(payload){
        router.push("/resposta")
    }
}

return(
    <formContext.Provider value={{etapaAtual,respostas,setResposta,proximaPergunta,reiniciar,nome,setNome,submitForms}}>
        {children}
    </formContext.Provider>
)
}

export const useForm = () =>{
    const context = useContext(formContext)
    
    return context
}