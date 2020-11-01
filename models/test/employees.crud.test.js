const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Employee', () => {

  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();

      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    } catch (err) {
      console.log(err);
    }

  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'department' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      const expectedName = 'Employee #1';
      expect(employee.firstName).to.be.equal(expectedName);
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });


  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });


  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'department' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' }, { $set: { firstName: '=Employee #1=' } });
      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      employee.firstName = '=Employee #1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });


  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'department' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      const removeEmployee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      expect(removeEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'department' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

}); 