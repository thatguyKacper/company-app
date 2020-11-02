const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/departments.model');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /departments/:id', () => {

  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

  });


  it('/:id should delete one department by :id ', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const updatedDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' });
    expect(res.body.message).to.be.equal('OK');
    expect(updatedDepartment).to.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });

});