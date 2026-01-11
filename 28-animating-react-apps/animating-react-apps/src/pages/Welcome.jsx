import {Link} from 'react-router-dom';

import cityImg from '../assets/city.jpg';
import heroImg from '../assets/hero.png';

import {motion, useScroll, useTransform} from "framer-motion";

export default function WelcomePage() {
    // Captura o valor do scroll da página em tempo real (quantos px o usuário já rolou)
    const {scrollY} = useScroll();


//
// ---------------------- CIDADE ----------------------
//

// yCity → controla o movimento vertical da imagem da cidade
// Ele transforma o valor do scroll em movimento pra baixo.
// • scroll 0px  → cidade não se mexe (y = 0)
// • scroll 200px → cidade desce 100px (y = 100)
    const yCity = useTransform(
        scrollY,
        [0, 200],   // valores de entrada (scroll)
        [0, 100]    // valores de saída (movimento)
    );

// opacityCity → controla a opacidade da cidade enquanto rola a tela.
// • scroll 0 → opacidade 1 (totalmente visível)
// • scroll 200 → opacidade 0.5
// • scroll 300 → opacidade 0.5
// • scroll 500 → opacidade 0 (some)
    const opacityCity = useTransform(
        scrollY,
        [0, 200, 300, 500],
        [1, 0.5, 0.5, 0]
    );


//
// ---------------------- HERÓI ----------------------
//

// yHero → movimento vertical do herói.
// Ele sobe conforme o scroll aumenta.
// • scroll 0px → y = 0 (parado)
// • scroll 200px → y = -150 (subiu 150px)
    const yHero = useTransform(
        scrollY,
        [0, 200],
        [0, -150]
    );

// opacityHero → opacidade do herói.
// Ele fica visível no começo e só desaparece bem mais pra frente.
// • scroll 0 → 1
// • scroll 300 → 1
// • scroll 500 → 0 (some)
    const opacityHero = useTransform(
        scrollY,
        [0, 300, 500],
        [1, 1, 0]
    );


//
// ---------------------- TEXTO ----------------------
//

// yText → move o texto pra baixo.
// • scroll 0 → y = 0
// • scroll 200–300 → y = 50
// • scroll 500 → y = 300 (vai pra longe)
    const yText = useTransform(
        scrollY,
        [0, 200, 300, 500],
        [0, 50, 50, 300]
    );

// scaleText → controla o tamanho do texto.
// • scroll 0 → escala 1 (tamanho normal)
// • scroll 300 → escala 1.5 (50% maior)
    const scaleText = useTransform(
        scrollY,
        [0, 300],
        [1, 1.5]
    );


    return (
        <>
            <header id="welcome-header">
                {/* Texto que cresce e se move com o scroll */}
                <motion.div id="welcome-header-content" style={{scale: scaleText, y: yText}}>
                    <h1>Ready for a challenge?</h1>
                    <Link id="cta-link" to="/challenges">
                        Get Started
                    </Link>
                </motion.div>

                {/* Imagem da cidade com parallax e fade-out */}
                <motion.img
                    style={{opacity: opacityCity, y: yCity}}
                    animate={{opacity: 1}} // Garante que a imagem entra visível ao carregar
                    src={cityImg}
                    alt="A city skyline touched by sunlight"
                    id="city-image"
                />

                {/* Herói que sobe e desaparece conforme o scroll */}
                <motion.img
                    style={{y: yHero, opacity: opacityHero}}
                    src={heroImg}
                    alt="A superhero wearing a cape"
                    id="hero-image"
                />
            </header>

            <main id="welcome-content">
                {/* conteúdo normal sem framer motion */}
                <section>
                    <h2>There&apos;s never been a better time.</h2>
                    <p>
                        With our platform, you can set, track, and conquer challenges at
                        your own pace. Whether it&apos;s personal growth, professional
                        achievements, or just for fun, we&apos;ve got you covered.
                    </p>
                </section>

                <section>
                    <h2>Why Challenge Yourself?</h2>
                    <p>
                        Challenges provide a framework for growth. They push boundaries,
                        test limits, and result in genuine progress. Here, we believe
                        everyone has untapped potential, waiting to be unlocked.
                    </p>
                </section>

                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>Custom challenge creation: Set the rules, define your pace.</li>
                        <li>
                            Track your progress: See your growth over time with our analytics tools.
                        </li>
                        <li>
                            Community Support: Join our community and get motivated by peers.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Join Thousands Embracing The Challenge</h2>
                    <p>
                        “I never realized what I was capable of until I set my first
                        challenge here. It&apos;s been a transformative experience!” - Alex
                        P.
                    </p>
                </section>
            </main>
        </>
    );
}