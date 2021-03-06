import PropTypes from 'prop-types';
import Link from 'next/link';

import DeveloperName from 'containers/developer-name';

function GameCard({
  gameId,
  gameTitle,
  developerWalletAddress,
  gamePrice,
  imgUrl,
}) {
  return (
    <div className="cell">
      <Link href={`/game/${gameId}`}>
        <a className="game-link">
          {imgUrl ? (
            <img src={imgUrl} alt={`${imgUrl} cover`} className="game-cover" />
          ) : null}
          <span className="game-details">
            <span className="game-info">
              <h2 className="game-title">{gameTitle}</h2>
              <h3 className="game-developer">
                <DeveloperName walletAddress={developerWalletAddress} />
              </h3>
            </span>
            <span className="price-cell">
              <span className="game-price eth">{gamePrice}</span>
            </span>
          </span>
        </a>
      </Link>
    </div>
  );
}

GameCard.propTypes = {
  gameId: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  gameTitle: PropTypes.string.isRequired,
  developerWalletAddress: PropTypes.string.isRequired,
  gamePrice: PropTypes.string,
};

GameCard.defaultProps = {
  gamePrice: '0',
  imgUrl: null,
};

export default GameCard;
