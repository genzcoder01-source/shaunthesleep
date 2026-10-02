import React from 'react';

// Three radiating burst rays (like in the reference images: \ | /)
export const SunburstRays: React.FC<{
  className?: string;
  color?: string;
  size?: number;
  direction?: 'left' | 'right' | 'top' | 'top-right' | 'top-left';
}> = ({ className = '', color = '#ffd43b', size = 32, direction = 'left' }) => {
  let rotation = 0;
  if (direction === 'right') rotation = 180;
  if (direction === 'top') rotation = 90;
  if (direction === 'top-right') rotation = 135;
  if (direction === 'top-left') rotation = 45;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <line x1="8" y1="20" x2="22" y2="20" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="12" y1="10" x2="24" y2="16" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="12" y1="30" x2="24" y2="24" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
};

// Hand-drawn doodle curly spiral
export const DoodleSpiral: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#ffd43b',
  size = 44,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M22 28C19 26 18 20 22 17C26 14 31 16 32 20C34 26 29 33 22 34C15 35 10 29 10 21C10 12 18 6 28 6C38 6 44 14 44 24C44 34 36 43 25 43C16 43 7 36 6 27"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Hand-drawn doodle star
export const DoodleStar: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#ffd43b',
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M25 5L30 18L44 19L33 29L36 43L25 35L14 43L17 29L6 19L20 18L25 5Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn doodle heart
export const DoodleHeart: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#bbf7d0',
  size = 40,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M25 42S8 31 8 19C8 12.5 13 8 19 8C22.5 8 24.5 10 25 11C25.5 10 27.5 8 31 8C37 8 42 12.5 42 19C42 31 25 42 25 42Z"
        stroke="#1e293b"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Hand-drawn tick marks (two angled white/yellow marks near ears)
export const MotionTicks: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#ffffff',
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <line x1="10" y1="12" x2="28" y2="20" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <line x1="8" y1="28" x2="24" y2="30" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
};
