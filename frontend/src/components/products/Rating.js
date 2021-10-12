import React from 'react';

const Rating = ({ value, text, color }) => {
  const starClassNames = [];
  for (let i = 1; i <= 5; i++) {
    starClassNames.push(
      value >= i
        ? 'fas fa-star'
        : value >= i - 0.5
        ? 'fas fa-star-half-alt'
        : 'far fa-star',
    );
  }

  return (
    <div className='rating my-3'>
      {starClassNames.map((star, i) => (
        <span key={i}>
          <i className={star} style={{ color }}></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};
Rating.defaultProps = {
  color: '#f8e825',
};
export default Rating;
