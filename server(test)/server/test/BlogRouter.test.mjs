/*import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app.js'; // 确保 app.js 中使用 export default app

describe('BlogRouter', function () {
  let token;
  const admin = { id: 1 }; // 假设我们有一个管理员用户

  // 在测试之前获取一个有效的 JWT token
  before(function () {
    // 在此处生成一个有效的 token
    token = 'Bearer ' + jwt.sign(admin, 'shhhhh', { expiresIn: '1h' });
  });

  describe('GET /blog/detail', function () {
    it('should get blog details', function (done) {
      request(app)
        .get('/blog/detail')
        .query({ id: 527377793867845 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('获取成功');
          expect(res.body).to.have.property('rows');
          done();
        });
    });

    it('should return error for non-existing blog', function (done) {
      request(app)
        .get('/blog/detail')
        .query({ id: 9999 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(500);
          expect(res.body.msg).to.equal('获取失败');
          done();
        });
    });
  });

  describe('POST /blog/search', function () {
    it('should search blogs', function (done) {
      request(app)
        .post('/blog/search')
        .send({ keyword: 'test', page: 1, pageSize: 10 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('查询成功');
          expect(res.body.data).to.have.property('rows');
          done();
        });
    });

    it('should return empty result for no match', function (done) {
      request(app)
        .post('/blog/search')
        .send({ keyword: 'nonexistentkeyword', page: 1, pageSize: 10 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('查询成功');
          expect(res.body.data.rows).to.be.an('array').that.is.empty;
          done();
        });
    });
  });

  describe('POST /blog/_token/add', function () {
    it('should add a new blog', function (done) {
      request(app)
        .post('/blog/_token/add')
        .set('Authorization', token)
        .send({ title: 'Test Blog', categoryId: 1, content: 'This is a test blog content.' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('添加成功');
          done();
        });
    });

    //it('should return error for missing fields', function (done) {
    //  request(app)
    //    .post('/blog/_token/add')
    //    .set('Authorization', token)
    //    .send({ title: '', categoryId: 1, content: 'This is a test blog content.' })
    //    .expect(200)
    //    .end((err, res) => {
    //      if (err) return done(err);
    //      expect(res.body.code).to.equal(500);
    //      expect(res.body.msg).to.equal('添加失败');
    //      done();
    //    });
    //});
  });

  describe('PUT /blog/_token/update', function () {
    it('should update a blog', function (done) {
      request(app)
        .put('/blog/_token/update')
        .set('Authorization', token)
        .send({ id: 527466826375237, title: 'Updated Blog', categoryId: 1, content: 'Updated content.' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('修改成功');
          done();
        });
    });

    it('should return error for non-existing blog', function (done) {
      request(app)
        .put('/blog/_token/update')
        .set('Authorization', token)
        .send({ id: 9999, title: 'Updated Blog', categoryId: 1, content: 'Updated content.' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(500);
          expect(res.body.msg).to.equal('修改失败');
          done();
        });
    });
  });

  describe('DELETE /blog/_token/delete', function () {
    it('should delete a blog', function (done) {
      request(app)
        .delete('/blog/_token/delete')
        .set('Authorization', token)
        .query({ id: 527467322912837 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('删除成功');
          done();
        });
    });

    it('should return error for non-existing blog', function (done) {
      request(app)
        .delete('/blog/_token/delete')
        .set('Authorization', token)
        .query({ id: 9999 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(500);
          expect(res.body.msg).to.equal('删除失败');
          done();
        });
    });
  });
});
*/
import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app.js'; // 确保 app.js 中使用 export default app

describe('BlogRouter', function () {
  let token;
  const admin = { id: 'fe0e1673-ac7e-41eb-90a8-136520dab2c3' }; // 假设我们有一个管理员用户

  // 在测试之前获取一个有效的 JWT token
  before(function () {
    // 在此处生成一个有效的 token
    token = 'Bearer ' + jwt.sign(admin, 'shhhhh', { expiresIn: '1h' });
  });

  describe('GET /blog/detail', function () {
    it('should get blog details', function (done) {
      request(app)
        .get('/blog/detail')
        .query({ id: 527377793867845 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('获取成功');
          expect(res.body).to.have.property('rows');
          done();
        });
    });

    it('should return error for non-existing blog', function (done) {
      request(app)
        .get('/blog/detail')
        .query({ id: 9999 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(500);
          expect(res.body.msg).to.equal('获取失败');
          done();
        });
    });
  });

  describe('POST /blog/search', function () {
    it('should search blogs', function (done) {
      request(app)
        .post('/blog/search')
        .send({ keyword: 'test', page: 1, pageSize: 10 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('查询成功');
          expect(res.body.data).to.have.property('rows');
          done();
        });
    });

    it('should return empty result for no match', function (done) {
      request(app)
        .post('/blog/search')
        .send({ keyword: 'nonexistentkeyword', page: 1, pageSize: 10 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('查询成功');
          expect(res.body.data.rows).to.be.an('array').that.is.empty;
          done();
        });
    });
  });

  describe('POST /blog/_token/add', function () {
    it('should add a new blog', async function() {
      const res = await request(app)
          .post('/blog/_token/add')
          .set('Authorization', token)
          .send({
              title: 'Test Blog Title',
              categoryId: 1,
              content: 'This is a test blog content',
              user_id: 'fe0e1673-ac7e-41eb-90a8-136520dab2c3',
              authority: 1
          });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('code', 200);
      expect(res.body).to.have.property('msg', '添加成功');
  });

    //it('should return error for missing fields', function (done) {
    //  request(app)
    //    .post('/blog/_token/add')
    //    .set('Authorization', token)
    //    .send({ title: '', categoryId: 1, content: 'This is a test blog content.' })
    //    .expect(200)
    //    .end((err, res) => {
    //      if (err) return done(err);
    //      expect(res.body.code).to.equal(500);
    //      expect(res.body.msg).to.equal('添加失败');
    //      done();
    //    });
    //});
  });

  describe('PUT /blog/_token/update', function () {
    it('should update a blog', function (done) {
      request(app)
        .put('/blog/_token/update')
        .set('Authorization', token)
        .send({ id: 527466826375237, title: 'Updated Blog', categoryId: 1, content: 'Updated content.' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('修改成功');
          done();
        });
    });

    it('should return error for non-existing blog', function (done) {
      request(app)
        .put('/blog/_token/update')
        .set('Authorization', token)
        .send({ id: 9999, title: 'Updated Blog', categoryId: 1, content: 'Updated content.' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(500);
          expect(res.body.msg).to.equal('修改失败');
          done();
        });
    });
  });

  describe('DELETE /blog/_token/delete', function () {
    it('should delete a blog', function (done) {
      request(app)
        .delete('/blog/_token/delete')
        .set('Authorization', token)
        .query({ id: 527467322912837 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(200);
          expect(res.body.msg).to.equal('删除成功');
          done();
        });
    });

    it('should return error for non-existing blog', function (done) {
      request(app)
        .delete('/blog/_token/delete')
        .set('Authorization', token)
        .query({ id: 9999 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.code).to.equal(500);
          expect(res.body.msg).to.equal('删除失败');
          done();
        });
    });
  });
});
