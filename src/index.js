import express from 'express'
import { query, body, validationResult } from 'express-validator'
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())
const data = [

]
let id = 1
//create users 
app.post('/api/user',
    body('email')
        .isEmail()
        .notEmpty()
        .withMessage('Email not be empty'),
    (req, res) => {
        const result = validationResult(req)
        console.log("result:::::::::::", result)
        if (!result.isEmpty())
            return res.status(400).send({ errors: result.array() })

        const { name, first_name, email } = req.body
        data.push({
            id: id++,
            name: name,
            first_name: first_name,
            email: email
        })
        return res.status(201).send(data)
    })
//update user
app.put('/api/user/:id', (req, res) => {
    const oneUser = data.find(e => e.id === parseInt(req.params.id))

    if (!oneUser) {
        return res.status(404).send('User not found')
    }

    const { name, first_name } = req.body

    oneUser.name = name
    oneUser.first_name = first_name

    return res.status(200).send(oneUser)
})

//Get users
app.get('/api/users', (req, res) => {
    console.log(req.query)
    return res.status(200).send(data)
})

//Get user by id
app.get('/user/:id', (req, res) => {
    const oneUser = data.find(e => e.id === parseInt(req.params.id))
    if (!oneUser) {
        return res.status(404).send('user not found')
    }
    return res.status(200).send(oneUser)
})

//Delete user
app.delete("/api/user/delete/:id", (req, res) => {
    const oneUser = data.find(e => e.id === parseInt(req.params.id))

    if (!oneUser) {
        return res.status(404).send('User not found')
    }

    data.splice(oneUser, 1)
    return res.status(204).send('User delete')
})

app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})