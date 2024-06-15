import "../Card/Card.css";

function Card({ name, imgURL, onClick }) {
  return (
    <button className="card" onClick={() => onClick(name)}>
      <div className="card-content">
        <img src={imgURL} className="card-img" alt={`image of ${name}`}></img>
        <p className="card-title">{name}</p>
      </div>
    </button>
  );
}

export default Card;
