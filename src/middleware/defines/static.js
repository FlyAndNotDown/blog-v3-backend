import koaStatic from 'koa-static';
import middlewareConfig from '../../configs/middleware';

export default () => {
    return koaStatic(middlewareConfig.static.staticPath);
};