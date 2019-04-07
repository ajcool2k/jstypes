import { IType, Type, Req } from '../index.js'

export default class Person extends IType {

  /*
  {
    name: ...,      | String
    surname: ...,   | String
    age: ...        | Number
    optional: ...   | String
  }
  */

  constructor (data) {
    super()
    
    this._name = this.map(data, 'name', 'John', Type.STRING)
    this._surname = this.map(data, 'surname', 'Doe', Type.STRING)
    this._age = this.map(data, 'age', null, Type.NUMBER)
    this._optional = this.map(data, 'optional', null, Type.STRING, Req.OPTIONAL)
  }

  get name () { return this._name } 
  set name (name) { this._name = name } 

  get surname () { return this._surname } 
  set surname (surname) { this._surname = surname } 

  get age () { return this._age } 
  set age (age) { this._age = age } 

  get optional () { return this._optional } 
  set optional (optional) { this._optional = optional }   
}
