import { IType, Type } from '../index'

export default class Person extends IType {

  /*
  {
    name: ...,      | String
    surname: ...,   | String
    age: ...        | Number
  }
  */

  constructor (data) {
    super()

    this._name = this.map(data, 'name', 'John', Type.STRING)
    this._surname = this.map(data, 'surname', 'Doe', Type.STRING)
    this._age = this.map(data, 'age', null, Type.NUMBER)
  }

  get name () { return this._name } 
  set name (name) { this._name = name } 

  get surname () { return this._surname } 
  set surname (surname) { this._surname = surname } 

  get age () { return this._age } 
  set age (age) { this._age = age } 


}
