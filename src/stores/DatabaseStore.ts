import { create } from 'zustand'
import { customers } from '../db/models'
import { Db } from '../db/utils'
import { Customer, EstimateWithRelated } from '../types/data'

async function getEstimates() {
    let db = await Db.instance.db
    return db.select(
        `SELECT 
            e.*,
            c.name AS customer_name,
            c.email AS customer_email,
            c.phone_number AS customer_phone,
        FROM 
            estimates e
        LEFT JOIN 
            customers c ON e.customer_id = c.id
        ORDER BY id DESC;`
    )
}

interface StoreState {
    customers: Customer[]
    estimates: EstimateWithRelated[]
    refetchCustomers: () => void
    refetchEstimates: () => void
}

const useDatabaseStore = create<StoreState>((set) => ({
    customers: [],

    estimates: [],
    refetchCustomers: () => {
        customers.getAll().then((res) => set({ customers: res as Customer[] }))
        useDatabaseStore.getState().refetchEstimates()
    },
    refetchEstimates: async () => {
        getEstimates().then((res) =>
            set({ estimates: res as EstimateWithRelated[] })
        )
    },
}))

// Initial fetching of data
customers.getAll().then((res) => {
    useDatabaseStore.setState({ customers: res as Customer[] })
})
getEstimates().then((res) =>
    useDatabaseStore.setState({ estimates: res as EstimateWithRelated[] })
)

export default useDatabaseStore
