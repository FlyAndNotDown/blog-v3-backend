import controllerConfig from '../../configs/controller';
import hash from 'hash.js';
import fs from 'fs';
import { Log } from '../../tool/log';

/**
 * //file controller
 * @description {post} upload a file
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/file`,
    post: (database, models) => {
        return async (context, next) => {
            await next();

            const file = context.request.files.file;
            const reader = fs.createReadStream(file.path);
            const filePart = file.name.split('.');
            const fileExtend = filePart[filePart.length - 1];
            const fileName = `${hash.sha256().update(`${file.name}-${Date.now()}`).digest('hex')}.${fileExtend}`;
            const filePath = path.join(controllerConfig.fileUploadPath, fileName);
            const writer = fs.createWriteStream(filePath);
            reader.pipe(writer);

            return context.response.body = {
                name: fileName
            };
        };
    }
}