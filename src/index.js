import express from 'express'

const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())
const data = [

]
let id = 1
//create users 
app.post('/api/user', (req, res) => {
    const { name, first_name } = req.body

    data.push({
        id: id++,
        name: name,
        first_name: first_name
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
app.get('/users', (req, res) => {
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