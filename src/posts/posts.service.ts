import { Injectable, NotFoundException, UnprocessableEntityException, Logger } from '@nestjs/common';
import { PostModel } from './posts/posts.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { title } from 'process';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>
    ) { }

  private posts: Array<PostModel> = [];
  private readonly logger = new Logger(PostsService.name);
  
  public findAll = async () => {
    const posts = this.postRepository.find();
    this.logger.log('Returning all posts.');
    return posts;
  }
  
  public findOne = async(id: number) => {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    this.logger.log(`Returning post with id: ${id}`);
    return post;
  }

  public create = async(post: PostModel) => {
    const titleExists = await this.postRepository.findOneBy({ title });
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
    this.logger.log('Created a new post.');
    this.postRepository.save(blogPost);
    return blogPost;
  }

  public delete = async(id: number) => {
    if (id === -1) {
      throw new NotFoundException('Post not found.');
    }
    this.posts.splice(id, 1);
    this.logger.log('Deleted a post.');
    await this.postRepository.delete(id);
  }

  public update = async(id: number, post: PostModel) => {
    if (id === -1) {
      throw new NotFoundException('Post not found.');
    }

    const titleExists = await this.postRepository.findOneBy({ title });
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.posts[id] = blogPost;
    this.logger.log(`Updating post with id: ${id}`);
    await this.postRepository.save(blogPost);
    return blogPost;
  }
}
