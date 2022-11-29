import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseFilters } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostModel } from './posts/posts.interface';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('posts')
@ApiTags('posts')
@UseFilters(HttpExceptionFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'Posts retrieved successfully.' })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public create(@Body() post: PostModel) {
    return this.postsService.create(post);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.delete(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostModel) {
      return this.postsService.update(id, post);
    }
}

/**
 * kommentti
*/