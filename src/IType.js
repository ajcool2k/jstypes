import { map as m } from './Types'

export default class IType {
  map () { return m.apply(this, arguments) }
}
