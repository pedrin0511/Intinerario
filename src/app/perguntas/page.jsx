"use client"
import { useForm } from "@/context/FormContext"
import { useEffect, useState } from "react"

export default function Resultado() {
  const { respostas,aiResponse } = useForm()
  const [RespostaLocalStorange,setRespostaLocalStorange] = useState("")
  useEffect(() => {
    const resposta = localStorage.getItem("resposta")
    setRespostaLocalStorange(resposta)
  },[])
  
  return (
    <div>
      <p>{RespostaLocalStorange}</p>
    </div>
  )
}