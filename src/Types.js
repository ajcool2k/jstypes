import has from 'lodash/has'
import get from 'lodash/get'

import isSymbol from 'lodash/isSymbol'
import isBoolean from 'lodash/isBoolean'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'

export const Type = Object.freeze({
  SYMBOL: Symbol('symbol'),
  STRING: Symbol('string'),
  BOOL: Symbol('boolean'),
  NUMBER: Symbol('number'),
  OBJ: Symbol('object'),
  ARRAY: Symbol('array'),
  FUNC: Symbol('function')
})

export const Req = Object.freeze({
  REQUIRED: Symbol('REQUIRED'),
  OPTIONAL: Symbol('OPTIONAL')
})

export const map = function (obj, path, defaultValue, type, req) {
  // use default value if no object has been applied (empty constructor)
  if (typeof obj === 'undefined') return defaultValue

  // check object path
  if (has(obj, path) === false) {
    // create warning when parameter is not optional
    if (isRequired(req)) warn(this, `Could not parse expect object path: ${path}`)

    return defaultValue
  }
  
  const value = get(obj, path)

  if (!type || !hasData(value)) return value
  
  // check type
  const isValid = validateType(value, type)
  if (isValid === false) warn(this, `Expected Type ${type.toString()} for Object path: ${path}`)
  if (isValid === null) warn(this, `Type ${type.toString()} not one of the supported ones: ${JSON.stringify(Object.keys(Type))}`)

  return value
}

const hasData = (value) => typeof value !== 'undefined' && value !== null

const isRequired = (req) => {
  return req !== Req.OPTIONAL
}

const validateType = (value, type) => {
  switch (type) {
    case Type.ARRAY:
      return isArray(value)

    case Type.BOOL:
      return isBoolean(value)      

    case Type.NUMBER:
      return isNumber(value)      

    case Type.STRING:
      return isString(value)      

    case Type.OBJ:
      return isObject(value)

    case Type.FUNC:
      return isFunction(value)

    case Type.SYMBOL:
      return isSymbol(value)
      
    default:
      return null
  }
}

const warn = (context, msg) => {
  const callerName = get(context, 'constructor.name', 'unknown')
  console.warn(`[${callerName}] - ${msg}`)
  context.__problems.push(msg)
}
