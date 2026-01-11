import {createPortal} from 'react-dom';
import {motion} from 'framer-motion';

export default function Modal({title, children, onClose}) {
    return createPortal(
        <>
            <div className="backdrop" onClick={onClose}/>
            <motion.dialog
                // Posso adicionar variáveis para reutilizar e não repetir animações CSS
                variants={{
                    hidden: {opacity: 0, y: 30},
                    visible: {opacity: 1, y: 0},
                }}

                /*
                   Transforma o <dialog> em um elemento animável.
                   O modal continua funcionando normalmente, mas agora com animações.
                */
                open
                className="modal"

                /*
                   initial → estado ANTES do modal aparecer na tela:
                   - opacity: 0   → começa invisível
                   - y: 100       → começa 100px abaixo (fora da tela)
                */
                initial="hidden" // {{opacity: 0, y: 100}} - posso fazer assim, mas comentei pq estou usando variável

                /*
                   animate → estado ATUAL do modal enquanto ele está aberto:
                   - opacity: 1   → totalmente visível
                   - y: 0         → posição natural
                   O Framer Motion anima suavemente do initial → animate.
                */
                animate="visible" // {{opacity: 1, y: 0}}- posso fazer assim, mas comentei pq estou usando variável

                /*
                   exit → animação quando o modal está SAINDO do DOM:
                   (funciona apenas dentro de <AnimatePresence>)
                   - opacity: 1   → mantém visível
                   - y: 100       → desce novamente 100px
                   Cria uma animação de saída suave.

                   <AnimatePresence /> está no arquivo Header
                */
                exit={{acity: 0, y: 30}}// acity: 0, y: 30} - posso fazer assim, mas comentei pq estou usando variável

                /*
                   transition → define a duração da animação.
                   Aqui: 1 segundo para entrada e saída.
                */
                transition={{duration: 1}}
            >
                <h2>{title}</h2>
                {children}
            </motion.dialog>
        </>,
        document.getElementById('modal')
    );
}
