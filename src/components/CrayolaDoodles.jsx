import React from 'react';

// Filtro SVG reutilizable para dar el efecto de crayola/lápiz irregular
const CrayolaFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <filter id="crayola-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

// Estilos base para los SVGs
const baseStyle = {
  position: 'absolute',
  opacity: 0.75,
  zIndex: 1,
  pointerEvents: 'none'
};

const CrayolaPath = ({ d, stroke, fill = 'none' }) => (
  <path d={d} stroke={stroke} strokeWidth="2.5" fill={fill} strokeLinecap="round" strokeLinejoin="round" filter="url(#crayola-texture)" />
);

const CrayolaCircle = ({ cx, cy, r, stroke, fill = 'none' }) => (
  <circle cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth="2.5" fill={fill} filter="url(#crayola-texture)" />
);

// 1. Pareja tomados de la mano
export const DoodleHoldingHands = ({ style }) => (
  <svg viewBox="0 0 100 100" width="80" height="80" style={{ ...baseStyle, ...style }}>
    {/* Persona 1 (Azul suave) */}
    <CrayolaCircle cx="35" cy="30" r="8" stroke="#6B9AC4" />
    <CrayolaPath d="M35 38 L35 65 M35 45 L20 55 M35 45 L50 50 M35 65 L25 85 M35 65 L40 85" stroke="#6B9AC4" />
    {/* Persona 2 (Rosa suave) */}
    <CrayolaCircle cx="65" cy="32" r="7" stroke="#D18299" />
    <CrayolaPath d="M65 39 L65 62 M65 46 L50 50 M65 46 L78 55 M65 62 L55 83 M65 62 L75 83" stroke="#D18299" />
    <CrayolaPath d="M50 50 L50 50" stroke="#E29578" /> {/* Manos unidas */}
  </svg>
);

// 2. Pareja caminando juntos
export const DoodleWalking = ({ style }) => (
  <svg viewBox="0 0 100 100" width="90" height="90" style={{ ...baseStyle, ...style }}>
    {/* Persona 1 (Verde suave) */}
    <CrayolaCircle cx="30" cy="35" r="8" stroke="#82A67D" />
    <CrayolaPath d="M30 43 L35 70 M30 50 L15 60 M30 50 L45 55 M35 70 L25 90 M35 70 L45 85" stroke="#82A67D" />
    {/* Persona 2 (Morado suave) */}
    <CrayolaCircle cx="55" cy="30" r="7" stroke="#A081B3" />
    <CrayolaPath d="M55 37 L58 65 M55 45 L45 55 M55 45 L70 50 M58 65 L48 85 M58 65 L68 85" stroke="#A081B3" />
    <CrayolaPath d="M80 85 Q90 80 85 90" stroke="#A081B3" /> {/* Efecto de movimiento */}
  </svg>
);

// 3. Dos muñecos dándose un abrazo/beso
export const DoodleKiss = ({ style }) => (
  <svg viewBox="0 0 100 100" width="85" height="85" style={{ ...baseStyle, ...style }}>
    {/* Persona 1 */}
    <CrayolaCircle cx="40" cy="40" r="8" stroke="#6B9AC4" />
    <CrayolaPath d="M40 48 L42 75 M40 55 L55 58 M40 55 L30 65 M42 75 L35 95 M42 75 L50 95" stroke="#6B9AC4" />
    {/* Persona 2 (muy cerca) */}
    <CrayolaCircle cx="52" cy="38" r="7" stroke="#D18299" />
    <CrayolaPath d="M52 45 L50 72 M52 52 L38 58 M52 52 L65 60 M50 72 L45 92 M50 72 L60 92" stroke="#D18299" />
    {/* Corazoncito arriba */}
    <CrayolaPath d="M45 20 C40 10 30 20 45 30 C60 20 50 10 45 20 Z" stroke="#E29578" fill="rgba(226,149,120,0.2)" />
  </svg>
);

// 4. Sentados juntos viendo algo (de espaldas o sentados de lado)
export const DoodleSitting = ({ style }) => (
  <svg viewBox="0 0 100 100" width="100" height="80" style={{ ...baseStyle, ...style }}>
    {/* Base (suelo) */}
    <CrayolaPath d="M20 75 Q50 78 80 75" stroke="#A081B3" />
    {/* Persona 1 */}
    <CrayolaCircle cx="40" cy="45" r="8" stroke="#E29578" />
    <CrayolaPath d="M40 53 L40 75 M40 60 L30 70 M40 60 L50 68 M40 75 L45 75 M40 75 L35 85" stroke="#E29578" />
    {/* Persona 2 */}
    <CrayolaCircle cx="58" cy="48" r="7" stroke="#82A67D" />
    <CrayolaPath d="M58 55 L58 75 M58 62 L48 68 M58 62 L68 70 M58 75 L53 75 M58 75 L63 85" stroke="#82A67D" />
  </svg>
);

// 5. Muñecos con corazón (Pregunta final)
export const DoodleHeart = ({ style }) => (
  <svg viewBox="0 0 100 100" width="90" height="90" style={{ ...baseStyle, ...style }}>
    {/* Persona 1 */}
    <CrayolaCircle cx="30" cy="35" r="8" stroke="#6B9AC4" />
    <CrayolaPath d="M30 43 L30 75 M30 50 L45 50 M30 50 L15 65 M30 75 L20 95 M30 75 L40 95" stroke="#6B9AC4" />
    {/* Persona 2 */}
    <CrayolaCircle cx="70" cy="35" r="7" stroke="#D18299" />
    <CrayolaPath d="M70 42 L70 75 M70 50 L55 50 M70 50 L85 65 M70 75 L60 95 M70 75 L80 95" stroke="#D18299" />
    {/* Corazón en medio sosteniéndolo */}
    <CrayolaPath d="M50 45 C40 35 30 50 50 65 C70 50 60 35 50 45 Z" stroke="#E29578" fill="rgba(209,130,153,0.3)" />
  </svg>
);

// 6. Celebrando saltando (Sección del Sí)
export const DoodleCelebrating = ({ style }) => (
  <svg viewBox="0 0 100 100" width="100" height="100" style={{ ...baseStyle, ...style }}>
    {/* Persona 1 Saltando */}
    <CrayolaCircle cx="35" cy="25" r="8" stroke="#82A67D" />
    <CrayolaPath d="M35 33 L35 55 M35 40 L20 30 M35 40 L50 30 M35 55 L25 70 M35 55 L45 65" stroke="#82A67D" />
    {/* Persona 2 Saltando */}
    <CrayolaCircle cx="65" cy="20" r="7" stroke="#A081B3" />
    <CrayolaPath d="M65 27 L65 50 M65 35 L50 25 M65 35 L80 25 M65 50 L55 60 M65 50 L75 70" stroke="#A081B3" />
    {/* Estrellitas de celebración */}
    <CrayolaPath d="M50 10 L50 5 M45 15 L40 10 M55 15 L60 10" stroke="#E5C07B" />
    <CrayolaPath d="M20 15 L15 10 M80 10 L85 5" stroke="#E5C07B" />
  </svg>
);

// 7. Los dos juntos con corazones alrededor (Mensaje Final)
export const DoodleTogether = ({ style }) => (
  <svg viewBox="0 0 120 100" width="120" height="100" style={{ ...baseStyle, ...style }}>
    {/* Persona 1 */}
    <CrayolaCircle cx="50" cy="40" r="8" stroke="#6B9AC4" />
    <CrayolaPath d="M50 48 L50 80 M50 55 L35 65 M50 55 L65 65 M50 80 L40 100 M50 80 L60 100" stroke="#6B9AC4" />
    {/* Persona 2 */}
    <CrayolaCircle cx="70" cy="42" r="7" stroke="#D18299" />
    <CrayolaPath d="M70 49 L70 78 M70 56 L55 65 M70 56 L85 65 M70 78 L60 98 M70 78 L80 98" stroke="#D18299" />
    {/* Corazones flotando */}
    <CrayolaPath d="M30 20 C25 15 15 25 30 35 C45 25 35 15 30 20 Z" stroke="#E29578" />
    <CrayolaPath d="M90 30 C85 25 75 35 90 45 C105 35 95 25 90 30 Z" stroke="#A081B3" />
    <CrayolaPath d="M60 15 C55 10 45 20 60 30 C75 20 65 10 60 15 Z" stroke="#E5C07B" />
  </svg>
);

export { CrayolaFilter };
