import React from 'react';

// Filtro SVG reutilizable para dar el efecto de crayola/lápiz irregular
export const CrayolaFilter = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
    <defs>
      <filter id="crayola-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

const baseStyle = {
  display: 'inline-block',
  opacity: 0.85,
  pointerEvents: 'none',
  maxWidth: '100%',
  height: 'auto'
};

const CrayolaPath = ({ d, stroke, strokeWidth = '2.5', fill = 'none', strokeLinecap = 'round', strokeLinejoin = 'round' }) => (
  <path d={d} stroke={stroke} strokeWidth={strokeWidth} fill={fill} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} filter="url(#crayola-texture)" />
);

const CrayolaCircle = ({ cx, cy, r, stroke, strokeWidth = '2.5', fill = 'none' }) => (
  <circle cx={cx} cy={cy} r={r} stroke={stroke} strokeWidth={strokeWidth} fill={fill} filter="url(#crayola-texture)" />
);

// 1. Dos figuras tomadas de la mano
export const DoodleHoldingHands = ({ style, width = 100, height = 75 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    {/* Persona 1 (Azul suave) */}
    <CrayolaCircle cx="32" cy="24" r="7" stroke="#6B9AC4" />
    <CrayolaPath d="M32 31 L32 54 M32 38 L18 46 M32 38 L48 42 M32 54 L24 72 M32 54 L38 72" stroke="#6B9AC4" />
    {/* Persona 2 (Rosa suave) */}
    <CrayolaCircle cx="66" cy="26" r="6.5" stroke="#D18299" />
    <CrayolaPath d="M66 33 L66 52 M66 39 L52 42 M66 39 L78 48 M66 52 L58 70 M66 52 L74 70" stroke="#D18299" />
    {/* Manos unidas */}
    <CrayolaPath d="M48 42 Q50 43 52 42" stroke="#E29578" strokeWidth="3" />
    {/* Corazoncito flotando */}
    <CrayolaPath d="M50 14 C47 8 40 12 50 20 C60 12 53 8 50 14 Z" stroke="#E29578" fill="rgba(226,149,120,0.25)" />
  </svg>
);

// 2. Pareja caminando juntos
export const DoodleWalking = ({ style, width = 95, height = 80 }) => (
  <svg viewBox="0 0 100 85" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaCircle cx="30" cy="28" r="7.5" stroke="#82A67D" />
    <CrayolaPath d="M30 36 L35 60 M30 42 L15 52 M30 42 L45 48 M35 60 L25 80 M35 60 L45 76" stroke="#82A67D" />
    <CrayolaCircle cx="58" cy="25" r="7" stroke="#A081B3" />
    <CrayolaPath d="M58 32 L60 56 M58 40 L45 48 M58 40 L72 45 M60 56 L50 76 M60 56 L70 76" stroke="#A081B3" />
    <CrayolaPath d="M78 75 Q88 70 82 80" stroke="#A081B3" strokeWidth="1.8" />
  </svg>
);

// 3. Dos figuras dándose un beso tierno
export const DoodleKiss = ({ style, width = 85, height = 75 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaCircle cx="38" cy="30" r="7.5" stroke="#6B9AC4" />
    <CrayolaPath d="M38 38 L40 60 M38 44 L50 46 M38 44 L28 52 M40 60 L32 76 M40 60 L44 76" stroke="#6B9AC4" />
    <CrayolaCircle cx="54" cy="29" r="6.8" stroke="#D18299" />
    <CrayolaPath d="M54 36 L52 58 M54 42 L42 46 M54 42 L64 50 M52 58 L48 75 M52 58 L58 75" stroke="#D18299" />
    <CrayolaPath d="M46 14 C42 6 34 12 46 22 C58 12 50 6 46 14 Z" stroke="#E29578" fill="rgba(226,149,120,0.3)" />
    <CrayolaPath d="M22 24 L18 20 M68 22 L73 18" stroke="#E5C07B" strokeWidth="2" />
  </svg>
);

// 4. Sentados juntos
export const DoodleSitting = ({ style, width = 95, height = 75 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaPath d="M15 65 Q50 68 85 65" stroke="#A081B3" strokeWidth="2" />
    <CrayolaCircle cx="38" cy="35" r="7" stroke="#E29578" />
    <CrayolaPath d="M38 42 L38 62 M38 48 L26 56 M38 48 L48 54 M38 62 L44 62 M38 62 L32 72" stroke="#E29578" />
    <CrayolaCircle cx="56" cy="38" r="6.5" stroke="#82A67D" />
    <CrayolaPath d="M56 44 L56 62 M56 50 L46 54 M56 50 L66 56 M56 62 L50 62 M56 62 L62 72" stroke="#82A67D" />
  </svg>
);

// 5. Libro abierto con un corazón
export const DoodleOpenBook = ({ style, width = 85, height = 65 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaPath d="M50 30 L50 68" stroke="#82A67D" strokeWidth="2.5" />
    <CrayolaPath d="M50 30 Q30 22 12 28 L12 66 Q30 60 50 68" stroke="#82A67D" fill="rgba(130,166,125,0.08)" />
    <CrayolaPath d="M50 30 Q70 22 88 28 L88 66 Q70 60 50 68" stroke="#82A67D" fill="rgba(130,166,125,0.08)" />
    <CrayolaPath d="M22 38 Q34 35 44 38 M22 46 Q34 43 44 46 M22 54 Q34 51 44 54" stroke="#A081B3" strokeWidth="1.8" />
    <CrayolaPath d="M56 38 Q68 35 78 38 M56 46 Q68 43 78 46 M56 54 Q68 51 78 54" stroke="#A081B3" strokeWidth="1.8" />
    <CrayolaPath d="M50 12 C44 4 34 10 50 22 C66 10 56 4 50 12 Z" stroke="#D18299" fill="rgba(209,130,153,0.3)" />
  </svg>
);

// 6. Brújula, Luna y Estrellas
export const DoodleCompassMoon = ({ style, width = 90, height = 70 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaPath d="M25 20 C35 25 35 45 25 55 C45 52 50 25 25 20 Z" stroke="#E5C07B" fill="rgba(229,192,123,0.25)" />
    <CrayolaPath d="M60 18 L62 25 L69 27 L64 32 L65 39 L60 35 L55 39 L56 32 L51 27 L58 25 Z" stroke="#A081B3" fill="rgba(160,129,179,0.2)" strokeWidth="1.8" />
    <CrayolaPath d="M80 40 L81 44 L85 45 L82 48 L83 52 L80 50 L77 52 L78 48 L75 45 L79 44 Z" stroke="#6B9AC4" fill="rgba(107,154,196,0.2)" strokeWidth="1.5" />
    <CrayolaPath d="M42 60 L45 60 M43.5 58.5 L43.5 61.5" stroke="#D18299" strokeWidth="2" />
  </svg>
);

// 7. Casa sencilla con taza de café y luces
export const DoodleHomeCoffee = ({ style, width = 95, height = 75 }) => (
  <svg viewBox="0 0 110 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaPath d="M20 40 L40 22 L60 40 L60 70 L20 70 Z" stroke="#82A67D" fill="rgba(130,166,125,0.12)" />
    <CrayolaPath d="M35 70 L35 52 L45 52 L45 70" stroke="#82A67D" />
    <CrayolaCircle cx="40" cy="34" r="4" stroke="#E5C07B" fill="rgba(229,192,123,0.3)" />
    <CrayolaPath d="M50 24 L50 18 L55 18 L55 28" stroke="#82A67D" />
    <CrayolaPath d="M75 50 L75 66 C75 72 90 72 90 66 L90 50 Z" stroke="#E29578" fill="rgba(226,149,120,0.15)" />
    <CrayolaPath d="M90 54 Q96 54 96 60 Q96 64 90 64" stroke="#E29578" />
    <CrayolaPath d="M80 44 Q83 40 80 36 M85 44 Q88 40 85 36" stroke="#c2994c" strokeWidth="1.8" />
    <CrayolaPath d="M15 18 Q40 28 65 16 Q85 24 100 16" stroke="#c2994c" strokeWidth="1.5" />
    <CrayolaCircle cx="30" cy="24" r="2.5" stroke="#E5C07B" fill="#E5C07B" />
    <CrayolaCircle cx="50" cy="22" r="2.5" stroke="#D18299" fill="#D18299" />
    <CrayolaCircle cx="75" cy="20" r="2.5" stroke="#E5C07B" fill="#E5C07B" />
    <CrayolaCircle cx="92" cy="18" r="2.5" stroke="#82A67D" fill="#82A67D" />
  </svg>
);

// 8. Dos figuras abrazadas
export const DoodleHugging = ({ style, width = 95, height = 80 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaCircle cx="44" cy="26" r="7.5" stroke="#6B9AC4" />
    <CrayolaCircle cx="56" cy="27" r="7" stroke="#D18299" />
    <CrayolaPath d="M42 34 L38 60 M58 34 L62 60" stroke="#706863" />
    <CrayolaPath d="M38 42 C48 38 64 42 66 48" stroke="#6B9AC4" strokeWidth="2.8" />
    <CrayolaPath d="M62 44 C52 40 36 44 34 50" stroke="#D18299" strokeWidth="2.8" />
    <CrayolaPath d="M40 60 L36 78 M46 60 L44 78 M54 60 L56 78 M60 60 L64 78" stroke="#706863" strokeWidth="2.2" />
    <CrayolaPath d="M50 12 C46 4 36 10 50 20 C64 10 54 4 50 12 Z" stroke="#E29578" fill="rgba(226,149,120,0.3)" />
    <CrayolaPath d="M24 24 C20 18 12 22 24 30 C36 22 28 18 24 24 Z" stroke="#A081B3" fill="rgba(160,129,179,0.2)" strokeWidth="1.8" />
    <CrayolaPath d="M76 24 C72 18 64 22 76 30 C88 22 80 18 76 24 Z" stroke="#E5C07B" fill="rgba(229,192,123,0.2)" strokeWidth="1.8" />
  </svg>
);

// 9. Muñecos con corazón grande
export const DoodleHeart = ({ style, width = 90, height = 80 }) => (
  <svg viewBox="0 0 100 80" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaCircle cx="28" cy="28" r="7" stroke="#6B9AC4" />
    <CrayolaPath d="M28 35 L28 58 M28 42 L42 42 M28 42 L16 52 M28 58 L20 74 M28 58 L36 74" stroke="#6B9AC4" />
    <CrayolaCircle cx="72" cy="28" r="6.5" stroke="#D18299" />
    <CrayolaPath d="M72 34 L72 58 M72 42 L58 42 M72 42 L84 52 M72 58 L64 74 M72 58 L80 74" stroke="#D18299" />
    <CrayolaPath d="M50 36 C40 26 30 40 50 54 C70 40 60 26 50 36 Z" stroke="#E29578" fill="rgba(209,130,153,0.3)" strokeWidth="2.6" />
  </svg>
);

// 10. Celebrando saltando
export const DoodleCelebrating = ({ style, width = 95, height = 85 }) => (
  <svg viewBox="0 0 100 85" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaCircle cx="35" cy="22" r="7" stroke="#82A67D" />
    <CrayolaPath d="M35 29 L35 50 M35 36 L20 26 M35 36 L50 26 M35 50 L25 66 M35 50 L45 62" stroke="#82A67D" />
    <CrayolaCircle cx="65" cy="18" r="6.5" stroke="#A081B3" />
    <CrayolaPath d="M65 24 L65 46 M65 31 L50 22 M65 31 L80 22 M65 46 L55 58 M65 46 L75 66" stroke="#A081B3" />
    <CrayolaPath d="M50 10 L50 4 M44 14 L39 9 M56 14 L61 9" stroke="#E5C07B" strokeWidth="2" />
    <CrayolaPath d="M20 14 L15 9 M80 9 L85 4" stroke="#E5C07B" strokeWidth="2" />
  </svg>
);

// 11. Los dos juntos con corazones alrededor
export const DoodleTogether = ({ style, width = 110, height = 90 }) => (
  <svg viewBox="0 0 120 100" width={width} height={height} style={{ ...baseStyle, ...style }} aria-hidden="true">
    <CrayolaCircle cx="50" cy="40" r="8" stroke="#6B9AC4" />
    <CrayolaPath d="M50 48 L50 80 M50 55 L35 65 M50 55 L65 65 M50 80 L40 100 M50 80 L60 100" stroke="#6B9AC4" />
    <CrayolaCircle cx="70" cy="42" r="7" stroke="#D18299" />
    <CrayolaPath d="M70 49 L70 78 M70 56 L55 65 M70 56 L85 65 M70 78 L60 98 M70 78 L80 98" stroke="#D18299" />
    <CrayolaPath d="M30 20 C25 15 15 25 30 35 C45 25 35 15 30 20 Z" stroke="#E29578" />
    <CrayolaPath d="M90 30 C85 25 75 35 90 45 C105 35 95 25 90 30 Z" stroke="#A081B3" />
    <CrayolaPath d="M60 15 C55 10 45 20 60 30 C75 20 65 10 60 15 Z" stroke="#E5C07B" />
  </svg>
);

// Miniaturas decorativas
export const MiniFlower = ({ style }) => (
  <svg viewBox="0 0 50 50" width="30" height="30" style={{ position: 'absolute', opacity: 0.75, pointerEvents: 'none', zIndex: 3, ...style }} aria-hidden="true">
    <CrayolaPath d="M25 25 Q15 15 25 5 Q35 15 25 25" stroke="#c2994c" strokeWidth="1.8" />
    <CrayolaPath d="M25 25 Q15 35 5 25 Q15 15 25 25" stroke="#c2994c" strokeWidth="1.8" />
    <CrayolaPath d="M25 25 Q35 35 45 25 Q35 15 25 25" stroke="#c2994c" strokeWidth="1.8" />
    <circle cx="25" cy="25" r="3.5" fill="#d18299" opacity="0.9" />
  </svg>
);

export const MiniStar = ({ style }) => (
  <svg viewBox="0 0 30 30" width="22" height="22" style={{ position: 'absolute', opacity: 0.7, pointerEvents: 'none', zIndex: 3, ...style }} aria-hidden="true">
    <CrayolaPath d="M15 2 L18 11 L28 12 L20 18 L22 28 L15 22 L8 28 L10 18 L2 12 L12 11 Z" stroke="#c2994c" strokeWidth="1.6" fill="rgba(194,153,76,0.15)" />
  </svg>
);

export const MiniHeart = ({ style, color = '#d18299', size = 22 }) => (
  <svg viewBox="0 0 30 30" width={size} height={size} style={{ opacity: 0.8, pointerEvents: 'none', display: 'inline-block', ...style }} aria-hidden="true">
    <CrayolaPath d="M15 8 C11 1 2 7 15 22 C28 7 19 1 15 8 Z" stroke={color} strokeWidth="2.2" fill="rgba(209,130,153,0.25)" />
  </svg>
);
