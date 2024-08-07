import React, { useState, useEffect } from 'react';
import s from './styles.module.css';

const CircularProgressBar = ({ percentage, label, total }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const size = 150;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  const getColor = (percent) => {
    if (percent === 100) return 'var(--bright-bg)'; 
    if (percent >= 90) return '#A8FDA2';  
    if (percent >= 70) return 'var(--light-blue)'; 
    if (percent >= 50) return '#CE66AE'; 
    if (percent >= 30) return '#FDECB1'; 
    if (percent >= 10) return '#FFA500'; 
    return '#808080'; 
  };

  useEffect(() => {
    let percentageInterval;
    let totalInterval;

    if (animatedPercentage < percentage) {
      percentageInterval = setInterval(() => {
        setAnimatedPercentage((prev) => {
          const nextValue = prev + 1;
          if (nextValue >= percentage) {
            clearInterval(percentageInterval);
            return percentage;
          }
          return nextValue;
        });
      }, 10);
    }

    if (animatedTotal < total) {
      totalInterval = setInterval(() => {
        setAnimatedTotal((prev) => {
          const nextValue = prev + 1;
          if (nextValue >= total) {
            clearInterval(totalInterval);
            return total;
          }
          return nextValue;
        });
      }, 10);
    }

    return () => {
      clearInterval(percentageInterval);
      clearInterval(totalInterval);
    };
  }, [percentage, total]);

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
          stroke={getColor(animatedPercentage)}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.35s, stroke 0.35s',
          }}
        />
      </svg>
      <div className={s.progressText}>
        <span className={s.progressNumber}>{animatedTotal}</span>
        <span className={s.progressLabel}>{label}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
