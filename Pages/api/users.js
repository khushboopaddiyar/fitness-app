import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body

    try {
      const createdUser = await prisma.user.create({
        data: {
          name: name,
          email: email
        }
      })

      res.status(201).json(createdUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    // Update an existing user
    const { id, name, email } = req.body

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email
        }
      })

      res.status(200).json(updatedUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'DELETE') {
    // Delete an existing user
    const { id } = req.body

    try {
      const deletedUser = await prisma.user.delete({
        where: { id }
      })

      res.status(200).json(deletedUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'PATCH') {
    // Partially update an existing user
    const { id, name, email } = req.body

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name, email }
      })

      res.status(200).json(updatedUser)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany()
      res.json(users)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
