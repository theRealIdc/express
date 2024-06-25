import { Router } from "express";

import { matchedData, validationResult, checkSchema } from "express-validator";
import { createUserValidationsSchema } from "../utils/validationSchema.mjs";
const router = Router()

const data = [

]
let id = 1
//create users 
router.post('/api/create/user', checkSchema(createUserValidationsSchema), (req, res) => {
    const result = validationResult(req)
    console.log("result:::::::::::", result)
    if (!result.isEmpty())
        return res.status(400).send({ errors: result.array() })
    const data2 = matchedData(req)
    console.log('DATA::::', data2.age)
    if (data2.age < 0) {
        return res.status(400).send('Age must be a number')
    }
    const { name, first_name, email, age } = req.body
    data.push({
        id: id++,
        name: name,
        first_name: first_name,
        email: email,
        age: age
    })
    return res.status(201).send(data)
})

//Get All users
router.get('/api/getAllUsers/', (req, res) => {
    return res.status(200).send(data)
})
export default router

//Get User By User
router.get('/api/getUserById/:id', (req, res) => {
    const oneUser = data.find(e => e.id === parseInt(req.params.id))
    if (!oneUser) {
        return res.status(404).send('user not found')
    }
    return res.status(200).send(oneUser)
})

//Delete User
router.delete('/api/delete/user/:id', (req, res) => {
    const oneUser = data.find(e => e.id === parseInt(req.params.id))

    if (!oneUser) {
        return res.status(404).send('User not found')
    }


    data.splice(oneUser, 1)
    return res.status(204).send('User delete')
})

//Update user
router.put('/api/update/user/:id', (req, res) => {
    const oneUser = data.find(e => e.id === parseInt(req.params.id))

    if (!oneUser) {
        return res.status(404).send('User not found')
    }

    const { name, first_name } = req.body

    oneUser.name = name
    oneUser.first_name = first_name

    return res.status(200).send(oneUser)
})