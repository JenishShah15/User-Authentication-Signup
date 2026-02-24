import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jenish_015',
      database: 'crud_auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
