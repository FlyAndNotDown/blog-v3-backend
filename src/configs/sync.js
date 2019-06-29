import path from 'path';
import middlewareConfig from './middleware';

const blogSourceRepoPath = 'blog-source';

export default {
    blogSourceRepository: 'https://github.com/FlyAndNotDown/blog-source',
    gitRepoExistFlagFileName: '.blog-source-cloned',
    blogSourceRepoPath: blogSourceRepoPath,
    postPath: path.join(blogSourceRepoPath, 'post'),
    imagePath: path.join(blogSourceRepoPath, 'img'),
    uploadPath: path.join(middlewareConfig.static.staticPath, 'img'),
    serverImagePath: '/public/img',
    renderTestMdName: 'md-render-test.md'
};