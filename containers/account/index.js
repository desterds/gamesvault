import Jazzicon from 'react-jazzicon';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';

function Account() {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const formattedEther =
    etherBalance && formatEther(etherBalance).substring(0, 6);

  return (
    <div className="wallet">
      <div className="balance">{formattedEther} MATIC</div>
      <div className="account">
        <Jazzicon diameter={16} seed={parseInt(account.slice(2, 10), 16)} />
        <div className="address">{account}</div>
      </div>
    </div>
  );
}

Account.propTypes = {};

Account.defaultProps = {};

export default Account;
