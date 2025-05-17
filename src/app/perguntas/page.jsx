"use client"
import { useForm } from "@/context/FormContext"
import { useEffect, useState } from "react"

export default function Resultado() {
  const { respostas,aiResponse } = useForm()
  const [RespostaLocalStorange,setRespostaLocalStorange] = useState("")
  useEffect(() => {
    const Resposta = localStorage.getItem("resposta")
    setRespostaLocalStorange(respostas)
  },[aiResponse])
  
  return (
    <div>
      <p>{RespostaLocalStorange}</p>
    </div>
  )
}