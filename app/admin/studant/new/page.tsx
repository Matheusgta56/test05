
import { sql } from "@vercel/postgres";
import { useSearchParams } from "next/navigation";


export const revalidate = 0

export default function NewAluno(){ 
  


  async function saveAluno(formData: FormData){
    "use server"
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    console.log("nome, email")

    await sql`INSERT INTO aluno (nome, email) VALUES(${nome}, ${email})`
    console.log("Acessou função")


  }
  return (
    <div>
      <h1 className="text-black text-center text-4xl">Cadastrar Aluno</h1>
      <form>
        <input type="text" name="nome" placeholder="Nome do aluno" /><br /><br />
        <input type="text" name="email" placeholder="Email do aluno" /> <br /><br />
        <button formAction={saveAluno} className="text-black">Salvar</button>
        <br />
      </form>
    </div>

  )
}