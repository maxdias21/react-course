import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // Sem o use effect, vai dar erro, pq a referência não foi feita e o meu "dialog" é undefined
  // Como use effect só é executado depois do código inteiro ser executado, a referência vai ser feita, com isso
  // não dá erro
  useEffect(() => {
    if(open) {
      // Serve para deixar o modal com um fundo e não me deixa interagir com os elementos da página até fechar
   // É opcional
   dialog.current.showModal();
   } else {
     dialog.current.close();
   }
  
  }, [open])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      { open ? children : null }
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
