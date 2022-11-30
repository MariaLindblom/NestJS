import { create } from "domain";
import "reflect-metadata";
import { Posts } from './posts.entity';
import { PostsService } from "./posts.service";

export const post = new Posts()
post.post_date = new Date (2022-11-29)
post.title = "Testi"
post.content = "Testausta"
post.category = "Test"
//await postrepositary.save()

create
export const PostQueries = {
  AddPost: `
  INSERT INTO harkka.posts (post_date, title, content, category) VALUES(20221129, "Testi", "Testausta", "Test")`
};