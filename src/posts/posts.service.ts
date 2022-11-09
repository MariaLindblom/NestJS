import { Injectable, NotFoundException } from '@nestjs/common';
import { PostModel } from './posts/posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];

  public findAll(): Array<PostModel> {
    return this.posts;
  }

  public findOne(id: number): PostModel {
    const post: PostModel = this.posts.find(post => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
