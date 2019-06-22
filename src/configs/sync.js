import path from 'path';

export default {
    blogSourceRepository: 'https://github.com/FlyAndNotDown/blog-source',
    gitRepoExistFlagFileName: '.blog-source-cloned',
    blogSourceRepoPath: 'blog-source',
    postPath: path.join(blogSourceRepoPath, 'post'),
    imagePath: path.join(blogSourceRepoPath, 'img')
};