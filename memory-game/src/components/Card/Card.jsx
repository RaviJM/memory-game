function Card({ name, imgURL }) {
  return (
    <button className="card">
      <img src={imgURL} className="card-img"></img>
      <p className="card-title">{name}</p>
    </button>
  );
}

export default Card;
