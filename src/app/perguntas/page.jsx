"use client"
import { useForm } from "@/context/FormContext"

export default function Resultado() {
  const { respostas,aiResponse } = useForm()
  const RespostaLocalStorange = localStorage.getItem("resposta")
  return (
    <div>
      <p>{RespostaLocalStorange}</p>
    </div>
  )
}