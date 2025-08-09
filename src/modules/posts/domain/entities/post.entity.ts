export class Post {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  createdAt: string;
  constructor(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
  ) {
    this.title = title;
    this.shortDescription = shortDescription;
    this.content = content;
    this.blogId = blogId;
    this.createdAt = new Date().toISOString();
  }
}
