import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
    const title = useRef();
    const description = useRef();
    const deadline = useRef();

    // useAnimate retorna [scope, animate]
    // scope -> ref que você coloca no elemento pai; permite usar seletores internos para animar
    // animate -> função imperativa para animar por seletor / elemento
    const [scope, animate] = useAnimate();

    const [selectedImage, setSelectedImage] = useState(null);
    const { addChallenge } = useContext(ChallengesContext);

    function handleSelectImage(image) {
        setSelectedImage(image);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const challenge = {
            title: title.current.value,
            description: description.current.value,
            deadline: deadline.current.value,
            image: selectedImage,
        };

        if (
            !challenge.title.trim() ||
            !challenge.description.trim() ||
            !challenge.deadline.trim() ||
            !challenge.image
        ) {
            // Animando inputs/textarea com um "shake" quando o formulário estiver inválido.
            // - Seleciona 'input, textarea' dentro do scope (form)
            // - x: [-10, 0, 10, 0] cria o efeito de vai-e-volta (shake)
            // - type: 'tween' é recomendado quando a animação usa arrays
            // - duration curta para ficar rápido
            // - delay: stagger(0.05) faz com que cada campo comece com 0.05s de diferença
            animate(
                'input, textarea',
                { x: [-10, 0, 10, 0] },
                { type: 'tween', duration: 0.1, delay: stagger(0.05 )}
            );
            return;
        }

        onDone();
        addChallenge(challenge);
    }

    return (
        <Modal title="New Challenge" onClose={onDone}>
            {/* Coloca o ref do useAnimate no formulário para que os seletores funcionem */}
            <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input ref={title} type="text" name="title" id="title" />
                </p>

                <p>
                    <label htmlFor="description">Description</label>
                    <textarea ref={description} name="description" id="description" />
                </p>

                <p>
                    <label htmlFor="deadline">Deadline</label>
                    <input ref={deadline} type="date" name="deadline" id="deadline" />
                </p>

                {/* motion.ul controla o stagger dos filhos via variants */}
                <motion.ul
                    id="new-challenge-images"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.05, // cada <li> aparece com 0.05s de diferença
                            },
                        },
                    }}
                    /* Por padrão, você precisa controlar o estado (ex: initial / animate) no pai
                       para que as variants dos filhos rodem. Se quiser, posso adicionar initial="hidden" animate="visible". */
                >
                    {
                        images.map((image) => (
                            <motion.li
                                key={image.alt}
                                onClick={() => handleSelectImage(image)}
                                className={selectedImage === image ? 'selected' : undefined}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.5 }, // começa pequeno e invisível
                                    visible: {
                                        opacity: 1,
                                        scale: [1, 1.1, 1.2], // anima a escala em três etapas (pulso)
                                    },
                                }}
                                transition={{ type: 'tween' }} // tween recomendado para animações com array
                                exit={{ opacity: 1, scale: 1 }}
                            >
                                <img {...image} />
                            </motion.li>
                        ))
                    }
                </motion.ul>

                <p className="new-challenge-actions">
                    <button type="button" onClick={onDone}>
                        Cancel
                    </button>
                    <button>Add Challenge</button>
                </p>
            </form>
        </Modal>
    );
}
