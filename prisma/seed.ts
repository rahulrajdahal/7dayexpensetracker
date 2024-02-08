import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const categories = ['rent', 'transportation', 'food and drinks', 'vehicle', 'others']

const getEmoji = (search: string) => {
    switch (search.toLowerCase()) {
        case 'rent':
            return '🏡'
        case 'transportation':
            return '🚌'
        case 'food and drinks':
            return '🧉'
        case 'vehicle':
            return '🏎️'
        case 'others':
            return '👽'

        default:
            return '🏡'
    }
}

async function main() {
    await prisma.category.createMany({ data: categories.map(category => ({ title: category, emoji: getEmoji(category) })) })

    const allCategories = await prisma.category.findMany({ select: { id: true, title: true } })

    for (const category of allCategories) {
        await prisma.expense.createMany({
            data: Array(3).fill(0).map((_, i) => ({ title: `Title for ${category.title} ${i}`, description: `Description for the expense of ${category.title} ${i}`, categoryId: category.id, price: Math.random() * 1000, }))
        })
    }

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
