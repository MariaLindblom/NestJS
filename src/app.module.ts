import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'harjoitus.mysql.database.azure.com:3306',
      port: 3306,
      username: 'empirica',
      password: '',
      database: 'harkka',
      entities: [],
      synchronize: false,
    }),
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
