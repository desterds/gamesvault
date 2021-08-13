import PropTypes from 'prop-types';

function GameCard({ gameTitle, gameDeveloper, gamePrice, imgUrl }) {
  return (
    <div className="cell">
      <a className="game-link" href="#">
        <img src={imgUrl} alt={`${imgUrl} cover`} className="game-cover" />
        <span className="game-details">
          <span className="game-info">
            <h2 className="game-title">{gameTitle}</h2>
            <h3 className="game-developer">{gameDeveloper}</h3>
          </span>
          <span className="price-cell">
            <span className="game-price eth">{gamePrice}</span>
          </span>
        </span>
      </a>
    </div>
  );
}

GameCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  gameTitle: PropTypes.string.isRequired,
  gameDeveloper: PropTypes.string.isRequired,
  gamePrice: PropTypes.number.isRequired,
};

GameCard.defaultProps = {};

export default GameCard;
