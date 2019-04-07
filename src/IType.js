import { map as m } from './Types'

export default class IType {

  constructor () {
    this.__problems = []
  }

  map () { return m.apply(this, arguments) }
  
  /**
   * Returns a boolean about the latest mapping state
   * Returns false if a class has been instantiated but featured wrong data
   */
  isCorrectlyParsed () { return this.__problems.length === 0 }
  
  /**
   * Returns all attributes from a IType extended class
   * This function is needed to build a JSON object from the class which only contains properties.
   * Only properties are tracked which feature an ES6 getter function
   */
  getAttributes () {
    const classObj = Object.getPrototypeOf(this)
    const properties = Object.getOwnPropertyNames(classObj)
    const descriptors = properties.map(key => [key, Object.getOwnPropertyDescriptor(classObj, key)])
    const descriptorGetters = descriptors.filter(([key, descriptor]) => typeof descriptor.get === 'function')
    const attributes = descriptorGetters.map(([key]) => key)

    return attributes
  }

  /**
   * Returns an obj that has all attributes with getters and its values applied to itself
   */
  toJSON () {
    const obj = {}
    const attributes = this.getAttributes()
    
    attributes.forEach(elem => {
      obj[elem] = this[elem]
    })

    return obj
  }

  /**
   * Returns an array with parsing problems
   */
  getProblems () {
    return this.__problems
  }
}
