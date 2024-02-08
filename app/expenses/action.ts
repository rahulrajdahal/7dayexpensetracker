'use server'

import prisma from "@/prisma/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"
import { z } from "zod"


/**
 * validation for adding expense.
 */
const expenseSchema = z.object({
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(20, 'Min 20 characters.')
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addExpense = async (prevState: any, formData: FormData) => {
    try {


        const body = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            price: Number(formData.get('price') as string),
        }
        const category = formData.get('category') as string

        const validateBody = expenseSchema.safeParse(body)

        if (!validateBody.success) {
            return {
                errors: (validateBody.error.flatten().fieldErrors),
            }
        }

        await prisma.expense.create({
            data: {
                ...body,
                categoryId: category
            }
        })


        revalidatePath('expenses')
        return { type: 'success' }

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            throw new Error(
                error.message
            );
        }

        throw new Error(
            'Server Error'
        );

    }
}


