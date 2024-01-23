const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient({
    log: ["query"], // ye log show kar wa dega query terminal me jo aygi 
})


module.exports = prisma