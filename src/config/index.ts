type Config = {
  readonly MongoDBUri: string;
  readonly MongoDBTestUri: string;
};

const config: Config = {
  MongoDBUri: `mongodb+srv://dbUser:${process.env.mongodb_dbuser_password}@cluster0.8vlef.mongodb.net/nestjs?retryWrites=true&w=majority`,
  MongoDBTestUri: `mongodb+srv://dbUser:${process.env.mongodb_dbuser_password}@cluster0.8vlef.mongodb.net/nestjs-test?retryWrites=true&w=majority`,
};

export default config;
