"use client"
import { useForm } from "@/context/FormContext"

export default function Resultado() {
  const { respostas } = useForm()

  return (
    <div>
      <h2>incrivel {respostas[0]}!Muito bom nota 0</h2>
      <ul>
        {Object.values(respostas).map((resposta, index) => (
          <li key={index}>{resposta}</li>
        ))}
      </ul>
    </div>
  )
}
