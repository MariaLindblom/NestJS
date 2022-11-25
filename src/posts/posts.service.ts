import { Injectable, NotFoundException, UnprocessableEntityException, Logger } from '@nestjs/common';
import { PostModel } from './posts/posts.interface';
import { InjectRepository, InjectEntityManager, InjectDataSource } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { DataSource, EntityManager, getConnection, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectEntityManager() private postManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource
  ) { }


  private posts: Array<PostModel> = [];
  private readonly logger = new Logger(PostsService.name);

  /**
   * prevoius finall() function
   * public findAll(): Array<PostModel> {
    this.logger.log('Returning all posts.');
    return this.posts;
  }**/
  async findAll() {
    this.logger.log('Returning all posts.')
    await this.dataSource.createQueryBuilder(Posts, "posts")
    .getMany();
  }

  async findOne(id: number) {
    const postWithRepository = await this.postRepository.findOneBy({ id });

    const postWithQueryBuilder = await this.postRepository
      .createQueryBuilder("posts")
      .where("post.id= :postId", { postId: id })
      .getOne()

    const postFromEntityManager = await this.postManager
      .createQueryBuilder(Posts, "posts")
      .where("post.id= :postId", { postId: id })
      .getOne()

    const postFromDataSource = await this.dataSource
      .createQueryBuilder()
      .select("posts")
      .from(Posts, "posts")
      .where("post.id= :postId", { postId: id })
      .getOne()

      return {
        postWithRepository,
        postWithQueryBuilder,
        postFromEntityManager,
        postFromDataSource
      };
  }

  /**public findOne(id: number): PostModel {
    const post: PostModel = this.posts.find(post => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }**/

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

  public delete(id: number): void {
    const index: number = this.posts.findIndex(post => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }
    this.posts.splice(index, 1);
  }

  public update(id: number, post: PostModel): PostModel {
    this.logger.log(`Updating post with id: ${id}`);

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

    this.posts[index] = blogPost;
    return blogPost;
  }
}
