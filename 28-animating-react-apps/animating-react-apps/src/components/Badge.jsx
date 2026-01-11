import {motion} from "framer-motion";

export default function Badge({caption}) {
    // Sempre que a pessoa adicionar uma nova tarefa, o ícone que mostra quantas eu tenho vai aumentar e diminuir
    // Porém, isso só é feito na inicialização, ou seja, uma vez, mas eu posso usar a key no elemento pai pois
    // sempre que a key muda o react renderiza novamente o elemento ao qual pertence
    // Mais informações em ChallengeTabs no <Badge />
    return <motion.span
        animate={{scale: [1, 1.2, 1]}}
        transition={{durate: 0.2}}
        className="badge">
        {caption}
    </motion.span>;
}
