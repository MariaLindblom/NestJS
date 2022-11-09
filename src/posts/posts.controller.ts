import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostModel } from './posts/posts.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  public findAll(): Array<PostModel> {
    return this.postsService.findAll();
  }
}

/**
 * @Get()
 * public findAll(): Array<PostModel> {
 * return this.postsService.findAll();
 * }
*/