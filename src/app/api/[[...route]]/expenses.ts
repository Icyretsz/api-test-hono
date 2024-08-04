import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const expensesPostSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    amount: z.number()
})

type ExpensesType = z.infer<typeof expensesPostSchema>

const Expenses : ExpensesType[] = [
    {id: 1, title: 'Groceries', amount: 50},
    {id: 2, title: 'Utilities', amount: 100}
]

const expensesApp = new Hono()
    .get('/', (c) => {
        return c.json(Expenses)
    })
    .post('/', zValidator('json', expensesPostSchema) , async (c) => {
        const data = await c.req.valid('json')
        const expenses = expensesPostSchema.parse(data)
        return c.json(expenses)
    })
    .get('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const expense = Expenses.find(expense => expense.id === id)
        if (!expense) {
            return c.notFound()
        }
        return c.json({expense})
    })
    .delete('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const index = Expenses.findIndex(expense => expense.id === id)
        if (index === -1) {
            return c.notFound()
        }
        const deletedExpenses = Expenses.splice(index, 1)[0]
        return c.json({expense : deletedExpenses})
    })
    .get('/total-spent', (c) => {
        const total = Expenses.reduce((acc, expense) => acc + expense.amount, 0)
        return c.json({total})
    })

export default expensesApp
