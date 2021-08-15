// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import GamePublishButton from 'containers/game-publish-button';
import GamePublishManuallyButton from 'containers/game-publish-manually-button';
import GameEditForm from 'containers/game-edit-form';
import GameIconUpload from 'containers/game-icon-upload';
import GameBuildUpload from 'containers/game-build-upload';
import GameScreenshotsUpload from 'containers/game-screenshots-upload';
import GameCoverUpload from 'containers/game-cover-upload';
import GameTrailerUpload from 'containers/game-trailer-upload';

import { Page } from 'components/layouts';

import styles from './style.module.css';

const areLocksWorking = false;

function Edit() {
  const router = useRouter();
  const { gameId } = router.query;

  const handleSuccess = () => {
    toast.success('Game updated');
  };

  const handleError = () => {
    toast.error('Something wrong happened');
  };

  return (
    <Page className={styles.page}>
      <div className={`${styles['game-edit-wrapper']} .wrapper`}>
        <h1>Edit game</h1>
        {areLocksWorking ? (
          <GamePublishButton id={gameId} />
        ) : (
          <GamePublishManuallyButton id={gameId} />
        )}
        <GameScreenshotsUpload id={gameId} />
        <GameTrailerUpload id={gameId} />
        <GameBuildUpload id={gameId} />
        <GameIconUpload id={gameId} />
        <GameCoverUpload id={gameId} />
        <GameEditForm
          id={gameId}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </Page>
  );
}

Edit.propTypes = {};

export default Edit;
