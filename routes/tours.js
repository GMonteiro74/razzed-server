const router = require('express').Router();
const Tour = require('../models/Tour.model');

router.get('/tours', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }    
})

router.post('/tours', async (req, res) => {
    const { type, language, rate, pax, description, available, startDate, finalDate } = req.body;
    if ( !type || !language || !rate || !pax || !description || !available || !startDate || !finalDate ) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    try {
        const response = await Tour.create({ type, language, rate, pax, description, available, startDate, finalDate })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/tours/:id', async (req, res) => {
    try {
        const response = await Tour.findById(req.params.id);
        res.status(200).json(response);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }    
})

router.put('/tours/:id', async (req, res) => {
    const { type, language, rate, pax, description, available, startDate, finalDate } = req.body;
    if ( !type || !language || !rate || !pax || !description || !available || !startDate || !finalDate ) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    try {
        await Tour.findByIdAndUpdate(req.params.id, { type, language, rate, pax, description, available, startDate, finalDate })
        res.status(200).json(`Tour ${req.params.id} was updated`);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/tours/:id', async (req, res) => {
    try {
        await Tour.findByIdAndRemove(req.params.id);
        res.status(200).json({message: `Tour ${req.params.id} was removed`});
     } catch (error) {
         res.status(500).json({ message: error.message });
     }    
})


module.exports = router;