const router = require('express').Router()
const { status } = require('express/lib/response')
const Contact = require("../modules/User")

//POST :  ADD A NEW USER TO THE DATABASE (Creation)

router.post("/createContact", async (req, res) => {
    try {
        const { fullName, mail, age } = req.body
        const contact = await Contact.create({ fullName, mail, age })
        res.status(200).json({ status: true, message: "contact created", data: contact })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err })
    }
})

//GET :  RETURN ALL USERS (Reading)

router.get("/contactList", async (req, res) => {
    try {
        const contactList = await Contact.find({})
        res.status(200).json({ status: true, message: "contact list", data: contactList })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err })
    }
})

//DELETE : REMOVE A USER BY ID (Deleting)

router.get("/deleteContact/:id", async (req, res) => {
    try {
        const { id } = req.params
        let contact = await Contact.findById(id)

        if (contact) {
            await Contact.findByIdAndDelete(id)
            res.status(200).json({ message: "contact deleted", data: contact })
        } else {
            res.status(404).json({ status: true, message: "Not Found" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err })
    }
})

//PUT : EDIT A USER BY ID (Updating)

router.put("/editContact/:id", async (req, res) => {
    try {
        const { id } = req.params
        let contact = await Contact.findById(id)
        if (contact) {
            contact = await Contact.findByIdAndUpdate(id, { ...req.body })
            contact = await Contact.findById(id)
            res.status(200).json({ status: true, message: "contact updated", data: contact })
        } else {
            res.status(404).json({ status: true, message: "Not Found" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err })
    }
})

module.exports = router