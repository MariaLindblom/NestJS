import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Posts } from '././posts/posts.entity';
import * as dbconfig from "dbconfig.json";

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: dbconfig.host,
      port: dbconfig.port,
      username: dbconfig.username,
      password: dbconfig.password,
      database: dbconfig.database,
      entities: [Posts],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}