'use server'

import prisma from "@/prisma/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"
import { z } from 'zod'

/**
 * validation for adding category
 */
const categorySchema = z.object({
    title: z.string().min(1, 'Title is required.'),
})

/**
 * 
 * @param prevState -previous state of submitted form.
 * @param formData  -FormData values from form component.
 * @returns Promise<{errors: {[x: string]: string;};}>
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addCategory = async (prevState: any, formData: FormData) => {
    try {

        const body = {
            title: (formData.get('title') as string).toLowerCase()
            , emoji: (formData.get('emoji') as string)
        }

        const validateBody = categorySchema.safeParse(body)

        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }


        }


        await prisma.category.create({ data: body })


        revalidatePath('categories')
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

export const getAllCategories = async ({ take = 3, include, orderBy = { createdAt: 'desc' } }: { take?: number, include?: Record<string, unknown>, orderBy?: Record<string, unknown>, }) => {
    try {
        return await prisma.category.findMany({
            take, include,
            orderBy,
        })
    }

    catch (error) {

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








