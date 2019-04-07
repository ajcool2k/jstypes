import { expect } from 'chai'
import Person from './Person'

describe('Types', () => {
  describe('Creation', () => {
    it('should be ok to not use arguments', () => {
      const p = new Person()
  
      expect(p.isCorrectlyParsed()).to.be.ok
    })
  
    it('should be not ok when using wrong parameters', () => {
      expect(new Person(null).isCorrectlyParsed()).to.be.false
      expect(new Person(0).isCorrectlyParsed()).to.be.false
      expect(new Person(true).isCorrectlyParsed()).to.be.false
      expect(new Person(false).isCorrectlyParsed()).to.be.false
    })  
  
    it('should map an valid object to Person', () => {
      const data = { name: 'Max', surname: 'Mustermann', age: 31 }
      const p = new Person(data)
      
      expect(p.isCorrectlyParsed()).to.be.ok
      expect(p.name).to.equal(data.name)
      expect(p.surname).to.equal(data.surname)
      expect(p.age).to.equal(data.age)
    })
  
    it('should map an default values to Person when not using parameter', () => {
      const p = new Person()
  
      expect(p.name).to.equal('John')
      expect(p.surname).to.equal('Doe')
      expect(p.age).to.equal(null)
    })
  
    it('should map an default values to Person when not using all parameter', () => {
      const p = new Person({ name: 'Jane' })
  
      expect(p.name).to.equal('Jane')
      expect(p.surname).to.equal('Doe')
      expect(p.age).to.equal(null)
  
      const p2 = new Person({ surname: 'Locke' })
  
      expect(p2.name).to.equal('John')
      expect(p2.surname).to.equal('Locke')
      expect(p2.age).to.equal(null)
  
      const p3 = new Person({ age: 12 })
  
      expect(p3.name).to.equal('John')
      expect(p3.surname).to.equal('Doe')
      expect(p3.age).to.equal(12)
    })  
  
    it('should not be ok for required values', () => {
      const p = new Person({})
      expect(p.isCorrectlyParsed()).to.be.false
      expect(p.getProblems()).to.have.lengthOf(3)
    })
  })

  describe('Exports', () => {
    it('should return all attributes', () => {
      const p = new Person({})
      const attributes = p.getAttributes()
      expect(attributes).to.have.members(['name', 'surname', 'age', 'optional'])
    })
  
    it('should create a valid JSON', () => {
      const p = new Person()
      const json = p.toJSON()
      expect(json.name).to.equal('John')
      expect(json.surname).to.equal('Doe')
      expect(json.age).to.equal(null)
    })
  
    it('should be possible to stringify and parse a json', () => {
      const p = new Person()
  
      const pjson = p.toJSON()
      const pStr = JSON.stringify(p)
      const pjsonParsed = JSON.parse(pStr)
  
      expect(pjson).to.deep.equal(pjsonParsed)
    })
  
    it('should be possible copy contents', () => {
      const data = { name: 'Max', surname: 'Mustermann', age: 31 }
  
      const p = new Person(data)
      const p2 = new Person(p.toJSON())
  
      expect(p).to.deep.equal(p2)
    })
  
    it('different contents should not be equal', () => {
      const data = { name: 'Max', surname: 'Mustermann', age: 31 }
      const data3 = { name: 'Maxi', surname: 'Mustermann', age: 31 }
  
      const p = new Person(data)
      const p2 = new Person(data3)
  
      expect(p).to.not.eql(p2)
    })
  })
})
