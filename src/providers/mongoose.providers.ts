import { MongooseModule } from '@nestjs/mongoose';

export const mongoDBProviders = MongooseModule.forRootAsync({
  imports: [],
  useFactory: () => ({
    uri: process.env.MONGODB_URI, // 从环境变量中获取 URI
  }),
});
