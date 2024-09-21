import { Customer, Estimate } from '../types/data'
import { Model } from './utils'

export const customers = new Model<Customer>('customers')
export const estimates = new Model<Estimate>('estimates')
