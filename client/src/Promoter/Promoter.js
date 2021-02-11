

const Promoter = ({setPromotion}) => {

  const clickHandler = (e) => {
    console.log(e.target.value);
    setPromotion(e.target.value);
  }

  return (
    <div>
      <button value='q' onClick={clickHandler}>Queen</button>
      <button value='r' onClick={clickHandler}>Rook</button>
      <button value='b' onClick={clickHandler}>Bishop</button>
      <button value='n' onClick={clickHandler}>Knight</button>
    </div>
  )
}

export default Promoter;