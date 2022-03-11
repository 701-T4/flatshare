import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APIController } from './controllers/api.controller';
import { UsersModule } from './controllers/users/users.module';
import { HouseModule } from './controllers/house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [APIController],
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.production',
      isGlobal: true,
    }),
    UsersModule,
    HouseModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PassportModule,
  ],
})
export class AppModule {}
