import { Injectable, NotFoundException, UnprocessableEntityException, Logger } from '@nestjs/common';
import { PostModel } from './posts/posts.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { Repository } from 'typeorm';
import { PostQueries } from './posts.queries';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>
    ) { }


  private posts: Array<PostModel> = [];
  private readonly logger = new Logger(PostsService.name);
  
  /*async findAll() {
    this.logger.log('Returning all posts.');
    await this.dataSource.createQueryBuilder(Posts, "posts")
    .getMany();
    const posts = this.postRepository.find();
    return posts;
  }*/
  public findAll = async () => {
    this.logger.log('Returning all posts.');
    const posts = this.postRepository.find();
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

  public delete = async(id: number) => {
    const index: number = this.posts.findIndex(post => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }
    this.posts.splice(index, 1);
  }

  public update = async(id: number, post: PostModel) => {
    const index: number = this.posts.findIndex((post) => post.id ===id);

    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title && item.id !== id,
    );
    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.logger.log(`Updating post with id: ${id}`);
    this.posts[index] = blogPost;
    return blogPost;
  }
}
