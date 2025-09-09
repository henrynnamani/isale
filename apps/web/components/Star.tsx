import React, { useState } from 'react';

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? '#ffc107' : '#e4e5e9'}
    viewBox="0 0 24 24"
    stroke="#ffc107"
    style={{ width: 30, height: 30, cursor: 'pointer' }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.16c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.956c.3.922-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.784.57-1.838-.196-1.54-1.118l1.287-3.956a1 1 0 00-.364-1.118L2.045 9.382c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.95-.69l1.286-3.955z"
    />
  </svg>
);

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= (hover || rating)}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
