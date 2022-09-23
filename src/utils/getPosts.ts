const isProduction = import.meta.env.MODE === 'production';

export const getPosts = (posts: any) => {
  if (isProduction) {
    posts = posts.filter((post: any) => !post.frontmatter.draft);
  }
  return parsePostUrls(posts);
};

const parsePostUrls = (posts: any) => {
  return posts.map((post: any) => {
    const parsedUrl = post.file.match(/(?<=content\/).*(?=\/index\.md)/)[0];
    const parsedSlug = post.file.match(/(?<=content\/.*\/).*(?=\/index\.md)/)[0];
    return {
      ...post,
      url: parsedUrl,
      slug: parsedSlug,
    };
  });
};
