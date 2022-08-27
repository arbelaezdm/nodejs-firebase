const { Router } = require('express');
const {db} = require('../firebase')

const router = Router()

//==================ROUTE TO GET ALL CONTACTS===========================

/* A function that is called when the user goes to the route `/` and it is a `GET` request. */
router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('contacts').get()

    // console.log(querySnapshot.docs[0].data());

    /* Iterating the array data that is send from firebase */
    let users = querySnapshot.docs.map(user => ({
        id: user.id,
        /* A spread operator. It is used to spread the data of the user.data() into the object. */
        ...user.data()
    }))

    res.render('index', {users})
})


//==================ROUTE TO CREATE A CONTACT===========================
/* A function that is called when the user goes to the route `/new-contact` and it is a `POST` request. */
router.post('/new-contact', async (req, res ) => {

    /* Destructuring the data from the request body. */
    const { firstname, lastname, email, phone } = req.body

    /* Adding the data to the firebase database. */
    await db.collection('contacts').add({
        firstname,
        lastname,
        email,
        phone
    })

    res.redirect('/')
})
//==================ROUTE TO FIND THE CONTACT BY ID===========================
router.get('/edit-contact/:id', async (req, res) => {
    let user = await db.collection('contacts').doc(req.params.id).get()
    res.render('index', {user: {
        id: user.id,
        ...user.data()
    }})
})

//==================ROUTE TO DELETE A CONTACT BY ID===========================
router.get('/delete-contact/:id', async (req, res) => {
    let user = await db.collection('contacts').doc(req.params.id).delete()
    res.redirect('/')
})

//==================ROUTE TO UPDATE A CONTACT BY ID===========================
router.post('/update-contact/:id', async (req, res) => {
    let id = req.params.id
    await db.collection('contacts').doc(id).update(req.body)

    res.redirect('/')
})

module.exports = router