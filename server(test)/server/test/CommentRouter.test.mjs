import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // 使用 ES 模块导入你的 Express 应用

describe('Comment Module', function() {
    let token;

    // Before all tests, you should obtain a valid token
    before(async function() {
        const res = await request(app)
            .post('/admin/login')
            .send({ account: 'admin', password: '123456' }); // 使用有效的管理员账户和密码登录

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        token = res.body.data.token; // 保存token以便后续测试使用
    });

    it('should retrieve all comments', async function() {
        const res = await request(app)
            .get('/comment/allComments');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('rows');
    });

    it('should retrieve comments by blog ID', async function() {
        const res = await request(app)
            .get('/comment/BlogComments')
            .query({ id: '527377793867845' }); // 使用有效的博客 ID

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '查询成功');
        expect(res.body.rows).to.be.an('array').that.is.not.empty;;
    });

    it('could not retrieve comments by a wrong blog ID', async function() {
        const res = await request(app)
            .get('/comment/BlogComments')
            .query({ id: '11213' }); // 使用无效的博客 ID

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '查询成功');
        expect(res.body.rows).to.be.an('array').that.is.empty;;
    });

    it('should add a new comment', async function() {
        const res = await request(app)
            .post('/comment/_token/addComment')
            .set('Authorization', `Bearer ${token}`)
            .send({ value: 'This is a test comment', article_id: 1487561, user: 'test_user' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '添加成功');
    });

    it('should update an existing comment', async function() {
        
        let res = await request(app)
            .put('/comment/_token/updateComment')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: 556070526943301, value: 'Updated comment', user: 'test_user' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '修改成功');
    });

    it('should delete an existing comment', async function() {

        let res = await request(app)
            .delete('/comment/_token/deleteComment')
            .set('Authorization', `Bearer ${token}`)
            .query({ id: 556070782775365 });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '删除成功');
    });
});
