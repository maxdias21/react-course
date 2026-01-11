import Badge from './Badge.jsx';

import {motion} from "framer-motion";

function Tab({isSelected, onSelect, badgeCaption, children}) {
    return (
        <li>
            <button
                className={isSelected ? 'selected' : undefined}
                onClick={onSelect}
            >
                {children}

                {/*Aqui sempre que a key mudar, o framer motion vai fazer com que a Badge execute o comportamento
            Ou seja, sempre que eu alterar o valor de quantos itens eu tenho adicionado, o comportamento que eu
            quero é que ele aumente/diminua onde fica o contador.
            Se eu removo a key, ele nunca vai ser criado novamente e não vai ter o comportamento que eu espero.
            Porém, se eu coloco a key, quando ela muda, o elemento é recriado e tem o comportamento que eu espero.
          */}
                <Badge key={badgeCaption} caption={badgeCaption}></Badge>
            </button>
            {/*Layout id = coloco um id único e as div elas aparecem/desaparecem da DOM
        Quando usa desaparece e aparece, o framer motion faz uma transição suave de onde ela foi apagada
        para onde o novo foi gerado.
        Eu posso ver o exemplo de uma listra azul que fica em baixo dos campos active/complete/failed
        */}
            {isSelected && <motion.div layoutId="tab-indicator" className="active-tab-indicator"/>}
        </li>
    );
}

export default function ChallengeTabs({
                                          selectedType,
                                          onSelectType,
                                          challenges,
                                          children,
                                      }) {
    return (
        <>
            <menu id="tabs">
                <Tab
                    isSelected={selectedType === 'active'}
                    onSelect={() => onSelectType('active')}
                    badgeCaption={challenges.active.length}
                >
                    Active
                </Tab>
                <Tab
                    isSelected={selectedType === 'completed'}
                    onSelect={() => onSelectType('completed')}
                    badgeCaption={challenges.completed.length}
                >
                    Completed
                </Tab>
                <Tab
                    isSelected={selectedType === 'failed'}
                    onSelect={() => onSelectType('failed')}
                    badgeCaption={challenges.failed.length}
                >
                    Failed
                </Tab>
            </menu>
            <div>{children}</div>
        </>
    );
}
