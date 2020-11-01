const Employee = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  it('should should throw an error if at least one parameter is missing', () => {

    const emp = new Employee({})
    emp.validate(err => {
      expect(err.errors.firstName && err.errors.lastName && err.errors.department).to.exist;

    });

  });

  it('should throw an error if any parameter is not a string', () => {

    const cases = [{}, []];
    for (let param of cases) {
      const emp = new Employee({ firstName: param, lastName: param, department: param })

      emp.validate(err => {
        expect(err.errors.firstName && err.errors.lastName && err.errors.department).to.exist;
      });

    }

  });

  it('should not throw an error if parameters are correct', () => {

    const emp = new Employee({ firstName: 'name', lastName: 'surname', department: 'IT' });

    emp.validate(err => {
      expect(err).to.not.exist;

    });

  });

});