"use client"; // Declara que o componente deve ser renderizado no cliente, habilitando o uso de hooks como useState e useRef.

import { useRef, useState } from 'react'; // Importa hooks necessários: useRef para manipular referências DOM e useState para gerenciar estados.
import classes from './image-picker.module.css'; // Importa os estilos CSS específicos para o componente.
import Image from 'next/image'; // Importa o componente Image otimizado do Next.js.

export default function ImagePicker({ label, name }) {
  // Componente principal para permitir que o usuário selecione e visualize uma imagem.

  const [pickedImage, setPickedImage] = useState(); // Estado para armazenar a imagem selecionada (como uma URL base64).
  const imageInput = useRef(); // Referência ao elemento input do tipo file para manipulação direta.

  function handlePickClick() {
    // Função acionada ao clicar no botão "Pick an Image".
    // Simula um clique no input de arquivo usando a referência.
    imageInput.current.click();
  }

  function handleImageChange(event) {
    // Função chamada quando o usuário seleciona uma imagem no input de arquivo.
    const file = event.target.files[0]; // Obtém o primeiro arquivo selecionado.

    if (!file) {
      // Se nenhum arquivo foi selecionado, encerra a função.
      return;
    }

    const fileReader = new FileReader(); // Cria uma nova instância de FileReader para ler o conteúdo do arquivo.

    fileReader.onload = () => {
      // Callback chamada quando o arquivo é lido com sucesso.
      setPickedImage(fileReader.result); // Armazena o conteúdo do arquivo (base64) no estado pickedImage.
    };

    fileReader.readAsDataURL(file); // Lê o arquivo como uma URL de dados (base64), permitindo exibição no navegador.
  }

  return (
    <div className={classes.picker}>
      {/* Container principal do componente. */}
      <label htmlFor={name}>{label}</label>
      {/* Label para o input de arquivo, associado ao atributo name. */}
      <div className={classes.preview}>
        {/* Div para exibir a pré-visualização da imagem. */}
        {!pickedImage && <p>No image picked yet.</p>}
        {/* Se nenhuma imagem foi selecionada, exibe uma mensagem padrão. */}
        {pickedImage && (
          <Image
            src={pickedImage}
            alt="The image selected by the user."
            fill
          />
        )}
        {/* Se uma imagem foi selecionada, exibe-a usando o componente Image do Next.js. */}
      </div>
      <div className={classes.control}>
        {/* Div para os controles (input de arquivo e botão). */}
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg" // Restringe o tipo de arquivos aceitos.
          name={name}
          className={classes.input} // Aplica estilos ao input de arquivo.
          ref={imageInput} // Associa a referência criada com useRef.
          onChange={handleImageChange} // Configura o evento de mudança para processar a seleção do arquivo.
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
        {/* Botão para abrir o seletor de arquivos ao ser clicado. */}
      </div>
    </div>
  );
}
