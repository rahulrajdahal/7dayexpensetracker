'use server'

import prisma from "@/utils/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addExpense = async <T>(prevState: T, formData: FormData) => {
    try {

        const body = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
        }
        const category = formData.get('category') as string

        await prisma.expense.create({
            data: {
                ...body,
                category: { connectOrCreate: { where: { title: category }, create: { title: category } } }
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