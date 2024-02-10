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


        revalidatePath('category')
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

type IParamsWithInclude =
    { where?: Record<string, unknown>, take?: number, include?: Record<string, unknown>, orderBy?: Record<string, unknown> }
type IParamsWithSelect =
    { where?: Record<string, unknown>, take?: number, select?: Record<string, unknown>, orderBy?: Record<string, unknown> }

type IParams = IParamsWithInclude | IParamsWithSelect

export const getAllCategories = async ({ where, take, orderBy = { createdAt: 'desc' }, ...params }: IParams) => {
    try {

        if ('include' in params) {


            return await prisma.category.findMany({
                take, include: params.include, where,
                orderBy,
            })
        } else if ('select' in params) {
            return await prisma.category.findMany({
                take, select: params.select, where,
                orderBy,
            })
        } else {
            return await prisma.category.findMany({
                take, where,
                orderBy,
            })
        }
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








