import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Ocorreu um erro!</h1>
        <p>Essa página não existe :(</p>
      </main>
    </>
  )
}

export default ErrorPage;