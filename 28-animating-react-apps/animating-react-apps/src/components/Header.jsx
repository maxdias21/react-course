import {useState} from 'react';

import {AnimatePresence, motion} from "framer-motion";

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
    const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

    function handleStartAddNewChallenge() {
        setIsCreatingNewChallenge(true);
    }

    function handleDone() {
        setIsCreatingNewChallenge(false);
    }

    return (
        <>
            {/*Ele faz animações de entrada e saída no componente
               Quando o HTML na página é desmontado, o framerMotion só vai saber se ele estiver nesse componente
               Aí eu posso usar o método exit (estou usando no <Modal />
            */}
            <AnimatePresence>
                {isCreatingNewChallenge && <NewChallenge onDone={handleDone}/>}
            </AnimatePresence>

            <header id="main-header">
                <h1>Your Challenges</h1>
                <motion.button
                    // Animação enquanto o mouse está em cima do botão (hover):
                    // ele aumenta de tamanho para 110% (leve efeito de destaque)
                    whileHover={{scale: 1.1, backgroundColor: '#8b11f0'}}

                    // Configura o tipo da animação. Aqui é uma animação do tipo "mola":
                    // - type: "spring" → deixa o movimento mais "elástico"
                    // - stiffness: 500 → controla a rigidez da mola (quanto maior, mais rápido e "duro")
                    transition={{type: 'spring', stiffness: 100}}
                    onClick={handleStartAddNewChallenge}
                    className="button">
                    Add Challenge
                </motion.button>
            </header>
        </>
    );
}
