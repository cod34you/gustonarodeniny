/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

export default function App() {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [balloons, setBalloons] = useState([]);

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    const balloonInterval = setInterval(() => {
      const colors = ['#ff006e', '#8338ec', '#3a86ff', '#ffbe0b', '#fb5607'];
      const newBalloon = {
        id: Date.now(),
        left: Math.random() * 95,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setBalloons((prev) => [...prev, newBalloon]);
    }, 1200);

    return () => {
      window.removeEventListener('resize', detectSize);
      clearInterval(balloonInterval);
    };
  }, []);

  return (
    <div style={styles.container}>
      
      {/* Reset predvolených okrajov prehliadača a CSS Media Queries pre mobily */}
      <style>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(135deg, #7388b4, #ffc2d1, #8a3131);
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-120vh) rotate(20deg); opacity: 0; }
        }
        .balloon-element {
          animation: floatUp 7s linear forwards;
        }

        /* MEDIA QUERIES PRE MOBILNÉ ZARIADENIA */
        @media (max-width: 600px) {
          .responsive-emoji {
            font-size: 4rem !important; /* Zmenšenie emoji na mobile */
            margin-bottom: 10px !important;
          }
          .responsive-title {
            font-size: 2.2rem !important; /* Zmenšenie nadpisu na mobile */
            line-height: 1.2 !important;
          }
          .responsive-text {
            font-size: 1.2rem !important; /* Zmenšenie textu na mobile */
          }
        }
      `}</style>
      
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        numberOfPieces={150}
        gravity={0.08}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
      />

      <div style={styles.balloonContainer}>
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="balloon-element"
            style={{
              ...styles.balloon,
              backgroundColor: balloon.color,
              left: `${balloon.left}%`,
              animationDelay: `${balloon.delay}s`,
            }}
          >
            <div style={styles.string}></div>
          </div>
        ))}
      </div>

      <div style={styles.fullPageCard}>
        <span className="responsive-emoji" style={styles.emoji}>🥂</span>
        <h1 className="responsive-title" style={styles.title}>Všetko najlepšie k narodeninám Gusto!</h1>
        <p className="responsive-text" style={styles.text}>
          Prajeme Ti všetko najlepšie k dnešným narodeninám, pevné zdravie, veľa lásky a radosti v kruhu najbližších ! 🎉
        </p>
        <br />
        <p className="responsive-text" style={styles.text}>
          Miki, Gabika, Jakub 
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute', // Zmenené z fixed na absolute, aby fungoval scroll v prípade potreby
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh', // Zaistí natiahnutie na celú obrazovku
    minHeight: '100dvh', // Moderná dynamická výška pre mobilné prehliadače (ignoruje lišty)
    background: 'linear-gradient(135deg, #7388b4, #ffc2d1, #8a3131)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowX: 'hidden', // Zákaz horizontálneho posúvania (krajov)
    overflowY: 'auto', // Povolí vertikálny scroll, ak sa text nezmestí na výšku obrazovky
    padding: '30px 20px', // Väčší horný/spodný padding pre rezervu
    boxSizing: 'border-box',
    fontFamily: 'system-ui, sans-serif'
  },
  balloonContainer: {
    position: 'fixed', // Balóny lietajú cez fixné pozadie
    inset: 0,
    pointerEvents: 'none',
    zIndex: 0
  },
  balloon: {
    position: 'absolute',
    bottom: '-100px',
    width: '50px',
    height: '65px',
    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
    opacity: 0,
    zIndex: 1
  },
  string: {
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    width: '2px',
    height: '45px',
    backgroundColor: 'rgba(0,0,0,0.15)',
    transform: 'translateX(-50%)'
  },
  fullPageCard: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
    padding: '10px',
    boxSizing: 'border-box'
  },
  emoji: {
    fontSize: '6rem',
    display: 'block',
    marginBottom: '20px'
  },
  title: {
    fontSize: '4rem',
    fontWeight: '950',
    background: 'linear-gradient(45deg, #ff006e, #8338ec)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    paddingBottom: '10px',
    lineHeight: '1.3',
    marginBottom: '10px',
    letterSpacing: '-1px',
    display: 'block'
  },
  text: {
    color: '#070046',
    fontSize: '1.8rem',
    lineHeight: '1.6',
    fontWeight: '600',
    maxWidth: '650px',
    margin: '0 auto'
  }
};