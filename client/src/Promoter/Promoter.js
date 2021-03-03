import React from "react-router";
import PropTypes from 'prop-types';

const Promoter = ({ setPromotion }) => {
  const clickHandler = (e) => {
    setPromotion(e.target.value);
  };

  return (
    <div>
      <button value="q" onClick={clickHandler} type="button">
        Queen
      </button>
      <button value="r" onClick={clickHandler} type="button">
        Rook
      </button>
      <button value="b" onClick={clickHandler} type="button">
        Bishop
      </button>
      <button value="n" onClick={clickHandler} type="button">
        Knight
      </button>
    </div>
  );
};

Promoter.propTypes = {
  setPromotion: PropTypes.func.isRequired
}

export default Promoter;
