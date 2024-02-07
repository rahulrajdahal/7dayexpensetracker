'use server'

import prisma from "@/utils/prisma"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from 'zod'


const categorySchema = z.object({
    title: z.string().min(1, 'Title is required.'),
})



export const addCategory = async (prevState: any, formData: FormData) => {
    try {

        const body = {
            title: formData.get('title') as string
        }

        const validateBody = categorySchema.safeParse(body)

        if (!validateBody.success) {
            return {
                errors: Object.entries(validateBody.error.flatten().fieldErrors).map(([key, errorValue]) => ({ [key]: errorValue[0] }))[0],
            }


        }


        await prisma.category.create({ data: body })


        revalidatePath('category')
    } catch (error) {
        console.log(error,'error')
        
        if (error instanceof PrismaClientKnownRequestError) {
            throw new Error(
                error.message
            );
        }

        throw new Error(
            'Server Error'
        );

    }
    redirect('/categories')
}