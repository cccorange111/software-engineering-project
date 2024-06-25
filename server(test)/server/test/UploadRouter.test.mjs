import request from 'supertest';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import app from '../app.js'; // 确保 app.js 中使用 export default app

// 解决 __dirname 和 __filename 问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Upload Router Module', function() {
    describe('POST /upload/file', function() {
        let server;

        // 在所有测试之前启动服务器
        before(done => {
            server = app.listen(8081, done); // 启动测试服务器
        });

        // 在所有测试之后关闭服务器
        after(done => {
            server.close(done);
        });

        it('should upload a file successfully', function(done) {
            request(app)
                .post('/upload/file')
                .attach('file', fs.readFileSync(path.join(__dirname, 'testFile.txt')), 'testFile.txt')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.errno).to.equal(0);
                    expect(res.body.data).to.have.property('url');
                    expect(res.body.data).to.have.property('alt');
                    done();
                });
        });

        it('should return an error if no file is uploaded', function(done) {
            request(app)
                .post('/upload/file')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.errno).to.equal(1);
                    expect(res.body.message).to.equal('出现异常了');
                    done();
                });
        });
    });

    describe('POST /upload/upload', function() {
        it('should upload multiple files successfully', function(done) {
            request(app)
                .post('/upload/upload')
                .attach('files', fs.readFileSync(path.join(__dirname, 'testFile1.txt')), 'testFile1.txt')
                .attach('files', fs.readFileSync(path.join(__dirname, 'testFile2.txt')), 'testFile2.txt')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).to.equal(2);
                    res.body.data.forEach(file => {
                        expect(file.success).to.be.true;
                        expect(file).to.have.property('filePath');
                    });
                    done();
                });
        });
    });
});
