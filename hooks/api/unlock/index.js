import { useQueryClient, useQuery, useMutation } from 'react-query';
import { useEthers } from '@usedapp/core';

import {
  QUERY_KEY_UNLOCK_FILE,
  QUERY_KEY_UNLOCK_SYMBOL,
  QUERY_KEY_HAS_VALID,
} from 'hooks/api/query-keys';
import { useUnlock, DEFAULT_NETWORK_NUMBER } from 'context/unlock';

import { getHasValidKey, getLockQuery, getTokenSymbolQuery } from './queries';
import { createLockMutation, purchaseKeyMutation } from './mutations';

export function useGetLockQuery(props = {}) {
  const {
    lockAddress,
    networkNumber = DEFAULT_NETWORK_NUMBER,
    key = QUERY_KEY_UNLOCK_FILE,
    config = {},
  } = props;
  const { web3Service } = useUnlock();
  return useQuery(
    [key, { lockAddress }],
    () => getLockQuery({ web3Service, lockAddress, networkNumber }),
    config
  );
}

export function useGetTokenSymbolQuery(props = {}) {
  const {
    lockAddress,
    networkNumber = DEFAULT_NETWORK_NUMBER,
    key = QUERY_KEY_UNLOCK_SYMBOL,
    config = {},
  } = props;
  const { web3Service } = useUnlock();
  return useQuery(
    [key, { lockAddress }],
    () => getTokenSymbolQuery({ web3Service, lockAddress, networkNumber }),
    config
  );
}

export function usePurchaseKeyMutation(props = {}) {
  const { config } = props;
  const { walletService } = useUnlock();
  const { library } = useEthers();

  return useMutation((lockAddress) => {
    return purchaseKeyMutation({
      walletService,
      provider: library,
      lockAddress,
    });
  }, config);
}

export function useCreateLockMutation(props = {}) {
  const { config = {} } = props;

  const { walletService, web3Service } = useUnlock();
  const { library, account } = useEthers();

  return useMutation((lock) => {
    return createLockMutation({
      walletService,
      web3Service,
      owner: account,
      networkNumber: DEFAULT_NETWORK_NUMBER,
      provider: library,
      lock,
    });
  }, config);
}

export function useGetHasValidKeyQuery(props = {}) {
  const {
    lockAddress,
    networkNumber = DEFAULT_NETWORK_NUMBER,
    key = QUERY_KEY_HAS_VALID,
    config = {},
  } = props;

  const { web3Service } = useUnlock();
  const { account } = useEthers();

  return useQuery(
    [key, { lockAddress }],
    () => {
      return getHasValidKey({
        web3Service,
        lockAddress,
        networkNumber,
        account,
      });
    },
    config
  );
}

export function useInvalidateValidKeyQuery() {
  const queryClient = useQueryClient();
  return (lockAddress) => {
    queryClient.invalidateQueries([QUERY_KEY_HAS_VALID, { lockAddress }]);
  };
}
