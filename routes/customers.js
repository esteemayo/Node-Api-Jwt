const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { validateCustomer } = require('../helpers/auth');

// GET INDEX ROUTE
router.get('/', async (req, res) => {
    const customers = await Customer.find({})
        .sort('name')
        .limit(3);

    res.send(customers);
});

// GET MORE-CUSTOMERS ROUTE
router.get('/more-customers', async (req, res) => {
    const customers = await Customer.find({})
        .sort('name')
        // .or([{ name: 1 }, { isGold: true }])
        .select('name phone');

    res.send(customers);
});

// POST CUSTOMERS ROUTE/LOGIC
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    customer = await customer.save();

    res.send(customer);
});

// UPDATE CUSTOMER LOGIC/ROUTE
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

// DELETE CUSTOMER ROUTE
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

// GET A SINGLE CUSTOMER ROUTE
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});



module.exports = router;