import { getConnectionOptions, createConnection, getConnection } from 'typeorm';

export const createDbConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  await createConnection({ ...connectionOptions, name: 'default' });
};

export const closeDbConnection = async () => {
  await getConnection().close();
};

export const clearDb = async () => {
  const connection = getConnection();
  const entities = connection.entityMetadatas;

  await Promise.all(
    entities.map(async entity => {
      const repository = connection.getRepository(entity.name);
      return repository.delete({});
    }),
  );
};
