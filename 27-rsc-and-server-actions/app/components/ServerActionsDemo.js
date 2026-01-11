import fs from 'node:fs';

// Esta função é executada **somente no servidor**.
// Mesmo sendo usada a partir de um componente cliente ou de um <form>,
// o código interno NÃO é enviado para o navegador — o cliente nunca vê.
//
// Isso é importante porque aqui dentro podemos usar recursos sensíveis,
// como acesso a arquivos, banco de dados ou APIs privadas.
//
// Quando o formulário é enviado, o navegador faz uma requisição para o servidor,
// que então executa esta Server Action e retorna o resultado.
// Nada dentro dela roda no lado do cliente.


export default function ServerActionsDemo() {
    // Eu poderia criar uma pasta actions e jogar essa função lá
    // Depois usar um export (para deixar o código mais limpo)
    async function saveUserAction(formData) {
        'use server';
        const data = fs.readFileSync('dummy-db.json', 'utf-8');
        const instructors = JSON.parse(data);
        const newInstructor = {
            id: new Date().getTime().toString(),
            name: formData.get('name'),
            title: formData.get('title'),
        };

        instructors.push(newInstructor);
        fs.writeFileSync('dummy-db.json', JSON.stringify(instructors));
    }

    return (
        <div className="rsc">
            <h2>Server Actions</h2>
            <p>
                A "Form Action" converted to a "Server Action" via{' '}
                <strong>"use server"</strong>.
            </p>
            <p>Can be defined in a server component or a separate file.</p>
            <p>Can be called from inside server component or client component.</p>
            <form action={saveUserAction}>
                <p>
                    <label htmlFor="name">User name</label>
                    <input type="text" id="name" name="name" required/>
                </p>
                <p>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required/>
                </p>
                <p>
                    <button>Save User</button>
                </p>
            </form>
        </div>
    );
}