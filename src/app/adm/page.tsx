"use client"
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface Data{
     id:string
     nome:string
     respostas: string[];
}


export default function PainelAdm(){
    const [respostas, setRespostas] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
 const [aiResponse,setAiResponse] = useState("")
  

  useEffect(() => {
    const response = localStorage.getItem("RespostasFirebase")
        if(response){
            const parsed = JSON.parse(response)
            console.log("localstorange")
            setRespostas(parsed)
        }else{
            console.log("nova leitura")
            BuscarRespostas()
        }
  },[])

  
  
async function BuscarRespostas() {
        try {
            const querySnapshoy = await getDocs(collection(db,"respostas"))
            console.log(querySnapshoy)
            const data = querySnapshoy.docs.map((doc) =>({
                id:doc.id,
                ...(doc.data() as Omit<Data, "id">)
            }))
            console.log(data,"nova leitura")
            localStorage.setItem("RespostasFirebase",JSON.stringify(data))
            setRespostas(data)
        } catch (error) {
            console.error("Erro ao buscar respostas:", error);
        }finally{
            setLoading(false)
        }
    }

    const AtualizarDados = () =>{
        BuscarRespostas()
    }

    const exportarRespostas = () => {
  let textoFinal = '';

  respostas.forEach((resposta, indexUsuario) => {
    textoFinal += `Usuário: ${resposta.nome}\n`;
    resposta.respostas.forEach((r, i) => {
      textoFinal += `${i + 1}. ${r}\n`;
    });
    textoFinal += '\n'; // quebra de linha entre usuários
  });

  const blob = new Blob([textoFinal], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'respostas.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const submitStorange = () =>{
    localStorage.setItem("RespostadaIa", aiResponse)
    alert("Salvo!")
    setAiResponse("")
}
    return(
        <div>
            <Link href="/resultado">
                Ir para Resultado
            </Link>
            <div>
                <textarea 
                value={aiResponse}
                onChange={(e) => setAiResponse(e.target.value)}
                />
                <button onClick={submitStorange}>Enviar</button>
            </div>
            <p>Quantidade de resposas: {respostas.length}</p>
            <button style={{marginTop:"1em"}} onClick={AtualizarDados}>Atualizar dados</button>
            {respostas.length === 0 ?(
                <p>Não tem respostas ainda!</p>
            ):(
                <>
                <button style={{marginTop:"1em"}} onClick={exportarRespostas}>Exportar Respostas</button>

                {respostas.map((resposta,index) =>(
                    <div key={index}>
                        <h3>{resposta.nome}</h3>
                        <ul>
                            {resposta.respostas.map((r,i)=>(
                                <li key={i}>
                                    <strong>{r}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                </>
            )}

        </div>
    )
}