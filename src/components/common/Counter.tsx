"use client"
import React, { useEffect, useState } from 'react';

// Conditionally import AnimatedNumbers only on the client side
const AnimatedNumbers = typeof window !== 'undefined' ? require('react-animated-numbers').default : null;

export default function Counter({ num }: { num: number }) {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);

  return (
    <div>
      {state && AnimatedNumbers && (
        <AnimatedNumbers
          includeComma
          animateToNumber={num}
          fontStyle={{ fontSize: 40, fontWeight: 'bold' }}
          locale='en-US'
          configs={[
            { mass: 1, tension: 300, friction: 25 }, // Adjust tension and friction for slower animation
            { mass: 1, tension: 300, friction: 25 },
            { mass: 1, tension: 300, friction: 25 },
            { mass: 1, tension: 300, friction: 25 },
            { mass: 1, tension: 300, friction: 25 },
            { mass: 1, tension: 300, friction: 25 },
          ]}
        />
      )}
    </div>
  );
}

