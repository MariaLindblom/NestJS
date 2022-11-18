import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import dbconfig from "dbconfig.json";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
