import {createClient} from 'redis';
import {REDIS_HOST, REDIS_KEY, REDIS_PORT} from '@env';

export type RedisClient = ReturnType<typeof createClient>;

class Redis {
  client: RedisClient;

  static initClient() {
    return createClient({
      password: REDIS_KEY,
      socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    });
  }

  constructor(client: RedisClient) {
    this.client = client || Redis.initClient();
  }
}

export default Redis;
