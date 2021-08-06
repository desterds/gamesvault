import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Client } from '@textile/hub';
import { useAuth } from 'context/auth';

const Context = React.createContext();
const { Provider } = Context;
const keyInfo = {
  key: process.env.NEXT_PUBLIC_TEXTILE_KEY_PUBLIC,
  secret: process.env.NEXT_PUBLIC_TEXTILE_KEY_SECRET,
  type: process.env.NEXT_PUBLIC_TEXTILE_KEY_TYPE,
};

function DbProvider({ children }) {
  const { identity } = useAuth();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      const res = await Client.withKeyInfo(keyInfo);
      await res.getToken(identity);
      setClient(res);
      return client;
    };

    if (identity) {
      authorize();
    }
  }, [identity]);

  return <Provider value={{ client }}>{children}</Provider>;
}

DbProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useDb = () => React.useContext(Context);

export { DbProvider, useDb };
