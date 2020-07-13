export default function (app, db) {
    app.post('/api/notes', (req, res) => {
        console.log(req.body)
        res.send('Hello POST')
    })

    app.get('/api/notes', (req, res) => {
        res.send('Hello GET')
    })
}
