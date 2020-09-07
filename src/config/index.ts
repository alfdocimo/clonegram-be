type Config = {
  readonly MongoDBUri: string;
};

const config: Config = {
  MongoDBUri: `mongodb+srv://dbUser:${process.env.mongodb_dbuser_password}@cluster0.8vlef.mongodb.net/<nestjs>?retryWrites=true&w=majority`,
};

export default config;
