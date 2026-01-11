import {useContext} from 'react';

import {AnimatePresence, motion} from "framer-motion";

import {ChallengesContext} from '../store/challenges-context.jsx';

export default function ChallengeItem({
                                          challenge,
                                          onViewDetails,
                                          isExpanded,
                                      }) {
    const {updateChallengeStatus} = useContext(ChallengesContext);

    const formattedDate = new Date(challenge.deadline).toLocaleDateString(
        'en-US',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    );

    function handleCancel() {
        updateChallengeStatus(challenge.id, 'failed');
    }

    function handleComplete() {
        updateChallengeStatus(challenge.id, 'completed');
    }

    return (// motion.li com "layout":
        // Ativa Layout Animations → anima automaticamente mudanças de tamanho e posição.
        // Quando o conteúdo expande (isExpanded = true), a altura muda
        // e o Framer Motion faz a transição suave.
        // No caso, quando eu removo uma tarefa, a última faz uma transição suave ao invés de teleportar

        // Exit, quando o componente for ser movido, ele vai descer um pouco na tela e depois vai ser removido
        <motion.li layout exit={{y: -30, opacity: 0}}>
            <article className="challenge-item">
                <header>
                    <img {...challenge.image} />
                    <div className="challenge-item-meta">
                        <h2>{challenge.title}</h2>
                        <p>Complete until {formattedDate}</p>
                        <p className="challenge-item-actions">
                            <button onClick={handleCancel} className="btn-negative">
                                Mark as failed
                            </button>
                            <button onClick={handleComplete}>Mark as completed</button>
                        </p>
                    </div>
                </header>
                <div className="challenge-item-details">
                    <p>
                        <button onClick={onViewDetails}>
                            View Details{' '}
                            <motion.span
                                animate={{rotate: isExpanded ? 180 : 0}}
                                className="challenge-item-details-icon">&#9650;</motion.span>
                        </button>
                    </p>


                    {/*
                        Aqui eu preciso por dois motivos, como tem condicional, o elemento é removido do dom
                        Se eu remover, eu clico em details e a imagem fica grande/pequena, não quero isso
                        // O initial o height é 0 e a imagem não vai crescer, fica uma animação feia
                        // O exit vai servir pois a altura é height: auto para mostrar o tamanho total do texto,
                        se ela tem 400px, o exit é 0 e ela vai de 400 > 0 de forma animada
                    */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{height: 0, opacity: 0}}
                                animate={{height: 'auto', opacity: 1}}
                                exit={{height: 0, opacity: 0}}
                            >
                                <p className="challenge-item-description">
                                    {challenge.description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </article>
        </motion.li>
    );
}
