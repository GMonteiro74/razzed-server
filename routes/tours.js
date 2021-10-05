const router = require('express').Router();
const { response } = require('express'); 
const Tour = require('../models/Tour.model');

router.get('/tours', async (req, res) => {
    try {
        const tours = await Tour.find({ sort: {createdAt: -1} });
        res.status(200).json(tours);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }    
})

router.post('/tours', async (req, res) => {
    const { type, language, rate, pax, description, startDate, finalDate } = req.body;
    if ( !type || !language || !rate || !pax || !description || !startDate || !finalDate ) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    console.log(req.session);
    try {
        if (req.session.currentUser.type === 'agency') {
        const response = await Tour.create({ 
            type,
            language,
            rate, 
            pax, 
            description, 
            available: true, 
            startDate, 
            finalDate, 
            agency:req.session.currentUser })
        res.status(200).json(response);
        } else {
            res.status(401).json({ message: 'Unauthorized'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/my-tours', async (req, res) => {
    try {
        const response = await Tour.find({ sort: {createdAt: -1}, agency: req.session.currentUser});
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}
)

router.get('/my-tours/:id', async (req, res) => {
    console.log(req.session.currentUser);
    try {
        const response = await Tour.findById(req.params.id)
        res.status(200).json(response);
     } catch (error) {
         res.status(500).json({ message: error.message });
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

router.put('/my-tours/:id', async (req, res) => {
    const { type, language, rate, pax, description, startDate, finalDate } = req.body;
    if ( !type || !language || !rate || !pax || !description || !startDate || !finalDate ) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    try {
        await Tour.findByIdAndUpdate(req.params.id, { type, language, rate, pax, description, startDate, finalDate });
        
        res.status(200).json(`Tour ${req.params.id} was updated`);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/my-tours/:id', async (req, res) => {
    try {
        await Tour.findByIdAndRemove(req.params.id);
        if (req.session.currentUser === response.agency) {
        res.status(200).json({message: `Tour ${req.params.id} was removed`});
        } else {
            res.status(401);
        }
     } catch (error) {
         res.status(500).json({ message: error.message });
     }    
})


module.exports = router;