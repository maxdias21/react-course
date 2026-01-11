import {CORE_CONCEPTS} from '../../dados.js';
import {CoreConcept} from './CoreConcept.jsx';

export default function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((conceptItem, index) =>  <CoreConcept key={index} {...conceptItem}></CoreConcept>)}
      </ul>
    </section>
  );
} 