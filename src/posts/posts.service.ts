import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

  public create(post: PostModel): PostModel {
    const titleExists: boolean = this.posts.some(
      item => item.title === post.title,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exits.');
    }

    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.posts.push(blogPost);

    return blogPost;
    
  }
}
