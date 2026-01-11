import { useState } from 'react';
import {EXAMPLES} from '../../dados';
import Section from '../Section';
import {TabButton} from '../TabButton';
import Tabs from '../Tabs';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleClick(textButton) {
    setSelectedTopic(textButton);
  }

  // Armazeno o valor HTML em uma variável
  let tabContent =  <p>Please select a topic</p>;

  // Minha variável do useState, se tiver o valor alterado, eu substituo o meu HTML armazenado na var acima
  // pelo HTML abaixo
  // Só vai acontecer se clicar em um botão <TabButton>
  if(selectedTopic) {
    tabContent = 
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>
            {EXAMPLES[selectedTopic].code}
          </code>
        </pre>
      </div>
    }

  return (
    <Section id="examples">
      <Tabs 
      buttons={
        <>
          <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleClick('components')}>Components</TabButton>
          <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleClick('jsx')}>JSX</TabButton>
          <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleClick('props')}>Props</TabButton>
          <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleClick('state')}>State</TabButton>
        </>
        }
        >
        {tabContent}
      </Tabs>
    </Section>
  );
}