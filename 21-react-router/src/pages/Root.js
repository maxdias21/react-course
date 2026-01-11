import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import classes from './Root.module.css';

function RootLayout() {
  return (
    <>
      <h1>Root</h1>
      <MainNavigation />

      <main className={classes.content}>
        {/* Outlet - em app.js nas minhas rotas, eu envio um element, o Outlet é esse elemento sendo renderizado, parecido com a prop children */}
        <Outlet />
        </main>
    </>
  )
}

export default RootLayout;