import { Injectable } from '@nestjs/common';
import { PostModel } from './posts/posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];

  public findAll(): Array<PostModel> {
    return this.posts;
  }
}
