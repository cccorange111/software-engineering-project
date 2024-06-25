import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // 引用你的Express应用

describe('User Module', function () {
  let server;
  let token;

  // 在所有测试之前启动服务器
  before(done => {
    server = app.listen(8081, done); // 启动测试服务器
  });

  // 在所有测试之后关闭服务器
  after(done => {
    server.close(done);
  });

  // 测试用户注册
  it('should register a new user', async function () {
    const res = await request(server)
      .post('/admin/register')
      .send({ account: 'hello_world', password: '123456' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('code', 200);
    expect(res.body).to.have.property('msg', '注册成功');
    expect(res.body).to.have.property('data');
    token = res.body.data; // 保存token以便后续测试使用
  });

  // 测试用户登录
  it('should login an existing user', async function () {
    const res = await request(server)
      .post('/admin/login')
      .send({ account: 'admin', password: '123456' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('code', 200);
    expect(res.body).to.have.property('msg', '登录成功');
    //expect(res.body.data).to.have.property('token');
  });

  // 测试修改用户信息
  it('should update user info', async function () {
    const res = await request(server)
      .put('/admin/updateUserInfo')
      .send({
        account: '615',
        new_account: 'admin_new',
        password: '123456',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('code', 200);
    expect(res.body).to.have.property('msg', '修改成功');
    expect(res.body.data).to.have.property('account', '615');
    expect(res.body.data).to.have.property('password');
  });
});
