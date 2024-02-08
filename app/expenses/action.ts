'use server'

import prisma from "@/prisma/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"



const expenseSchema = z.object({
    title: z.string().min(1, 'Title is required.'),
    description: z.string().min(20, 'Min 20 characters.')
})

export const addExpense = async <T>(prevState: T, formData: FormData) => {
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
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }
        }

        await prisma.expense.create({
            data: {
                ...body,
                categoryId: category
            }
        })


        revalidatePath('expenses')
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
    redirect('/expenses')
}


