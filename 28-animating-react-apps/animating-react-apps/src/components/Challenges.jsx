import {useContext, useState} from 'react';

import {ChallengesContext} from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

import {AnimatePresence, motion} from "framer-motion";
// AnimatePresence → anima entrada e saída de elementos condicionalmente renderizados
// motion → habilita animações em elementos comuns (<motion.div>, <motion.ol>, etc)

export default function Challenges() {
    const {challenges} = useContext(ChallengesContext);
    const [selectedType, setSelectedType] = useState('active');
    const [expanded, setExpanded] = useState(null);

    function handleSelectType(newType) {
        setSelectedType(newType);
    }

    function handleViewDetails(id) {
        setExpanded((prevId) => {
            if (prevId === id) {
                return null;
            }

            return id;
        });
    }

    const filteredChallenges = {
        active: challenges.filter((challenge) => challenge.status === 'active'),
        completed: challenges.filter(
            (challenge) => challenge.status === 'completed'
        ),
        failed: challenges.filter((challenge) => challenge.status === 'failed'),
    };

    const displayedChallenges = filteredChallenges[selectedType];

    return (
        <div id="challenges">
            <ChallengeTabs
                challenges={filteredChallenges}
                onSelectType={handleSelectType}
                selectedType={selectedType}
            >
                {/*
                    Primeiro AnimatePresence:
                    - Controla a animação quando a *lista inteira* muda ou some.
                    - O "mode='wait'" faz esperar a animação de saída terminar
                      antes da próxima entrar, evitando sobreposição feia.
                    - No caso, quando eu removo o último evento, ele começa a sumir mas aparece a mensagem de
                    "No challege found" ao mesmo tempo, o wait faz uma animação por vez
                    - O padrão é sync
                */}
                <AnimatePresence mode="wait">
                    {displayedChallenges.length > 0 && (

                        /*
                            motion.ol:
                            - A lista inteira (ol) anima quando aparece e quando desaparece.
                            - key="list" é importante para o AnimatePresence identificar o elemento.
                            - exit={{ y: -30, opacity: 0 }} → quando a lista some, sobe e desbota.
                        */
                        <motion.ol
                            initial={{opacity:0, y:-20}}
                            animate={{opacity:1, y:0}}
                            key="list"
                            exit={{y: -20, opacity: 0}}
                            className="challenge-items"
                        >

                            {/*
                                Segundo AnimatePresence:
                                - Controla as animações de entrada e saída dos ChallengeItem individualmente.
                                - Permite animar cada item ao ser adicionado/removido.
                            */}
                            <AnimatePresence>
                                {displayedChallenges.map((challenge) => (
                                    <ChallengeItem
                                        key={challenge.id}

                                        // Cada item pode expandir/fechar (layout animation no próprio componente)
                                        challenge={challenge}
                                        onViewDetails={() => handleViewDetails(challenge.id)}
                                        isExpanded={expanded === challenge.id}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.ol>
                    )}

                    {/*
                        Caso não tenha desafios:
                        AnimatePresence também anima esse <p> porque tem key diferente.
                        - Se a lista some e aparece o fallback, a transição é suave.
                    */}
                </AnimatePresence>

                {displayedChallenges.length === 0 && <motion.p
                    key="fallback"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, y: -20}}
                >No challenges found.
                </motion.p>}
            </ChallengeTabs>
        </div>
    );
}
