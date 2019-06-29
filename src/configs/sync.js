import path from 'path';
import middlewareConfig from './middleware';
import mainConfig from './main';

const blogSourceRepoPath = 'blog-source';

export default {
    blogSourceRepository: 'https://github.com/FlyAndNotDown/blog-source',
    gitRepoExistFlagFileName: '.blog-source-cloned',
    blogSourceRepoPath: blogSourceRepoPath,
    postPath: path.join(blogSourceRepoPath, 'post'),
    imagePath: path.join(blogSourceRepoPath, 'img'),
    uploadPath: path.join(middlewareConfig.static.staticPath, 'img'),
    serverImagePath: mainConfig.devMode ? 'http://localhost:30000/img' : '/img',
    renderTestMdName: 'md-render-test.md'
};