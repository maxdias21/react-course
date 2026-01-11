import logo from '../assets/investment-calculator-logo.png';

export default function Header() {
  return (
    <header id="header">
      <img src={logo} alt="Logo mostrando uma bolsa de dinheiro" />
      <h1>Calculadora de investimentos</h1>
    </header>
  )
}