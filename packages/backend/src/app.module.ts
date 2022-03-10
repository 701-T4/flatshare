import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APIController } from './api.controller';
import { UsersModule } from './users/users.module';
import { HouseModule } from './house/house.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './guards/firebase.auth';
import { UserStoreService } from './db/user/userStore.service';

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
  // providers: [FirebaseAuthStrategy, UserStoreService],
})
export class AppModule {}
