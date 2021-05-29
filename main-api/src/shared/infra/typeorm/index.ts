import { getConnectionOptions, createConnection, getConnection } from 'typeorm';

const connection = {
  async create() {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    await createConnection({ ...connectionOptions, name: 'default' });
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async entity => {
      const repository = connection.getRepository(entity.name);
      await repository.delete({});
    });
  },
};

export default connection;
