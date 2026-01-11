import { Link, NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <nav>
      <header className={classes.header}>
        <ul className={classes.list}>
          <li>
            {/* NavLink é igual Link, a diferença é que ele recebe um className com uma função que recebe uma prop isActive
            Basicamente, se esse link estiver ativo (o NavLink vai saber) ele retorna true, caso contrário false
            Posso usar isso para personalizar o css, o que estou fazendo é se o link estiver ativo, mudo a cor dele pro usuário saber onde está no menu

            O que end faz? Basicamente, o NavLink sabe a sua url nomedominio.com.br/menu
            Logo o menu estária ativo, mas se eu tiver /menu/usuário eu teria o /menu e /menu/usuário ativo
            O end serve para evitar isso, ele só vai retornar true caso a url seja idêntica a que eu pedi
            Supondo que eu pedi /menu/usuario, apenas essa retornaria true, a /menu não retornaria true

            Eu poderia adicionar um style ao invés da classe, é a mesma coisa do className, só que com style, ai eu poderia adicionar css diretamente sem classe
            */}
            <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined} end>Home</NavLink>
          </li>
          <li><NavLink to="/products" className={({isActive}) => isActive ? classes.active : undefined}>Produtos</NavLink></li>
        </ul>
      </header>
    </nav>
  )
}

export default MainNavigation;