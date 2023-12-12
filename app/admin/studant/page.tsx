import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const revalidate =0

export default async function ListAluno() {
    async function deleteAluno(formData: FormData){
        "use server"
        const id = formData.get("id") as string;
        await sql`DELETE from aluno where id=${id}`
        revalidatePath("/admin/studant/new")
    }
    const { rows } = await sql`SELECT * from aluno`;
    return (
        <div>
            <h1 className="text-center text-black">Lista de Aluno</h1>

            <table>
                <thead>
                    <tr> <td>Nome do Aluno</td> <td>Email do Aluno</td></tr>
                </thead>
                <tbody>
                    {
                        rows.map((aluno) => {
                            return (
                                <tr key={aluno.id}><td>{aluno.nome}</td> <td>{aluno.email}</td> 
                                <td>
                                    <form >
                                     <input type="text" hidden name="id" value={aluno.id}/>   
                                    <button formAction={deleteAluno}>Excluir</button>
                                    </form>
                                
                                </td> 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


        </div>
    )
}