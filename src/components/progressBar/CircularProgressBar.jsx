import React from 'react';
import s from './styles.module.css';

const CircularProgressBar = ({ percentage, label, total }) => {
  const size = 150; // Augmentez cette valeur pour agrandir le cercle
  const strokeWidth = 5; // Augmentez cette valeur pour une ligne plus épaisse
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={s.progressContainer}>
      <svg className={s.progressRing} width={size} height={size}>
        <circle
          className={s.progressRingCircle}
          stroke="rgba(255, 232, 248, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={s.progressRingCircle}
          stroke="#CE66AE"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className={s.progressText}>
        <span className={s.progressNumber}>{total}</span>
        <span className={s.progressLabel}>{label}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
