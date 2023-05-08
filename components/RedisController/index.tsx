import React, {createContext, useMemo, useState, ReactNode} from 'react';
import Redis, {RedisClient} from '../../utils/Redis';

type RedisContextType = {
  client: RedisClient | null;
};

export const RedisContext = createContext<RedisContextType>({
  client: null,
});

type ContextControllerProps = {
  children: ReactNode;
};

function RedisController({children}: ContextControllerProps) {
  const [client] = useState<RedisClient | null>(Redis.initClient());

  const value = useMemo(
    () => ({
      client,
    }),
    [client],
  );

  return (
    <RedisContext.Provider value={value}>{children}</RedisContext.Provider>
  );
}

export default RedisController;
