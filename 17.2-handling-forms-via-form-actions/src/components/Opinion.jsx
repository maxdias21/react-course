import {use, useActionState, useOptimistic} from 'react';
import {OpinionsContext} from "../store/opinions-context.jsx";

export function Opinion({opinion: {id, title, body, userName, votes}}) {
    const {upvoteOpinion, downvoteOpinion} = use(OpinionsContext);

    // Hook que gera um valor temporário mas depois volta para o valor padrão
    // Votes - valor original, no caso, um post tem 5 likes, ele vai pra 6 de forma instantânea e depois que o servidor atualiza ele pega o valor de votes
    // Se der erro no backend, ele volta pro valor padrão
    // prevVotes - primeiro valor de votes (no caso, meu post tem 5 likes, a pessoa curte e vai pra 6, o prevVotes é 5)
    // mode - é o parâmetro que eu passo quando chamo a função
    // optimisticVotes - é o valor que eu uso para mostrar no HTML, ele é o valor inicial (votes)
    // setVotesOptimistically - onde eu chamo a função
    const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) => mode === 'up' ? prevVotes + 1 : prevVotes -1);

    async function upvoteAction() {
        // Aqui eu chamo meu optimistic e ele vai fazer quantidade de like + 1 de forma instantânea
        setVotesOptimistically('up');
        await upvoteOpinion(id);
    }

    async function downvoteAction() {
        // Aqui eu chamo meu optimistic e ele vai fazer quantidade de like - 1 de forma instantânea
        setVotesOptimistically('down');
        await downvoteOpinion(id);
    }

    const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(upvoteAction, null);
    const [downvoteFormState, downvoteFormAction, downvotePending] = useActionState(downvoteAction, null);

    return (
        <article>
            <header>
                <h3>{title}</h3>
                <p>Shared by {userName}</p>
            </header>
            <p>{body}</p>
            <form className="votes">
                <button formAction={upvoteFormAction} disabled={upvotePending || downvotePending}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="m16 12-4-4-4 4"/>
                        <path d="M12 16V8"/>
                    </svg>
                </button>

                <span>{optimisticVotes}</span>

                <button formAction={downvoteFormAction} disabled={upvotePending || downvotePending}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="M12 8v8"/>
                        <path d="m8 12 4 4 4-4"/>
                    </svg>
                </button>
            </form>
        </article>
    );
}
