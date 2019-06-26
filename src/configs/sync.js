import path from 'path';

const blogSourceRepoPath = 'blog-source';

export default {
    blogSourceRepository: 'https://github.com/FlyAndNotDown/blog-source',
    gitRepoExistFlagFileName: '.blog-source-cloned',
    blogSourceRepoPath: blogSourceRepoPath,
    postPath: path.join(blogSourceRepoPath, 'post'),
    imagePath: path.join(blogSourceRepoPath, 'img'),
    renderTestMdName: 'md-render-test.md'
};