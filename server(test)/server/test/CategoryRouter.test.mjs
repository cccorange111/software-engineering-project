import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Category Module', function() {
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

    it('should retrieve category list', async function() {
        const res = await request(app)
            .get('/category/list');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('rows');
    });

    it('should add a new category', async function() {
        const res = await request(app)
            .post('/category/_token/add')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'New Category' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '添加成功');
    });

    it('should update an existing category', async function() {
        // First, we need to add a category to update
        let res = await request(app)
            .post('/category/_token/add')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Category to Update' });

        const categoryId = res.body.id; // 假设返回的响应体中包含新增分类的 id

        res = await request(app)
            .put('/category/_token/update')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: categoryId, name: 'Updated Category' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '修改成功');
    });

    it('should delete an existing category', async function() {
        // First, we need to add a category to delete
        let res = await request(app)
            .post('/category/_token/add')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Category to Delete' });

        const categoryId = res.body.id; // 假设返回的响应体中包含新增分类的 id

        res = await request(app)
            .delete('/category/_token/delete')
            .set('Authorization', `Bearer ${token}`)
            .query({ id: categoryId });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('code', 200);
        expect(res.body).to.have.property('msg', '删除成功');
    });
});
