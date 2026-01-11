export default function Tabs({children, buttons, buttonsContainer:ButtonsContainer = 'menu'}) {
  // React não vai saber que o buttonsContainer é um componente, ele pensa que é um elemento HTMl qualquer
  // Tem 3 formas de fazer o react usar como componente
  // 1 método:
  // Se minha prop começar com letra maiúscula, vai dar certo

  // 2 método
  // Para resolver isso, colocamos em uma variável
  // // const ButtonsContainer = buttonsContainer;
  // A variável tem que começar com maiúscula, pq com minúscula o react entende como tag html e não existe uma tag chamada
  // <buttonContainer>

  // 3 método
  // Usar type alias na props, ex: buttonsContainer:ButtonsContainer
  
  return(
    <>
      <ButtonsContainer>
        {buttons}
      </ButtonsContainer>
      {children}
    </>
  )
}