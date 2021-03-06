import React from 'react';
import PropTypes from 'prop-types';

import { WalletService, Web3Service } from '@unlock-protocol/unlock-js';

const Context = React.createContext();
const { Provider } = Context;

const networks = {
  137: {
    provider: 'https://rpc-mainnet.maticvigil.com/',
    locksmithUri: 'https://locksmith.unlock-protocol.com',
    unlockAddress: '0x14bb3586Ce2946E71B95Fe00Fc73dd30ed830863',
    unlockAppUrl: 'https://app.unlock-protocol.com',
    subgraphURI:
      'https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon',
  },
};

export const DEFAULT_NETWORK_NUMBER = 137;

function UnlockProvider({ children }) {
  const walletService = new WalletService(networks);
  const web3Service = new Web3Service(networks);

  return <Provider value={{ walletService, web3Service }}>{children}</Provider>;
}

UnlockProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useUnlock = () => React.useContext(Context);

export { UnlockProvider, useUnlock };
