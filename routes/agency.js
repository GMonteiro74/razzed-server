const router = require('express').Router();
const Agency = require('../models/Agency.model');

router.get('/agencies', async (req, res) => {
    try {
       const agencies = await Agency.find();
       res.status(200).json(agencies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
});

router.get('/agencies/:id', async (req, res) => {
    console.log(req.session.currentUser);
    
    try {
        const response = await Agency.findById(req.params.id);
        if (req.session.currentUser.email === response.email || req.session.currentUser.type === 'guide') {
        res.status(200).json(response);
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

router.put('/agencies/:id', async (req, res) => {
    const { name, email, location, established, imgUrl } = req.body;
    if ( !name || !email || !location || !established || !imgUrl ) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    try {
        await Agency.findByIdAndUpdate(req.params.id, { name, email, location, established, imgUrl });        
        res.status(200).json(`Agency ${req.params.id} was updated`);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.put('/agencies/:id/notification', async (req, res) => {
    const { message } = req.body;
    console.log(message)
    console.log(req.session.currentUser)
    try {
        const response = await Agency.findByIdAndUpdate(req.params.id, {
            $push: { notifications: { "sender": req.session.currentUser,
                "message":message }}
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



router.put('/agencies/:id/notification/delete', async (req, res) => {
    try {
        const response = await Agency.findByIdAndUpdate(req.params.id, {
            $pull: { notifications: { "sender": req.params.senderID}}
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// router.delete('/agencies/:id/notification', async (req, res) => {
//     try {
//         const response = await Agency.findByIdAndUpdate(req.params.id, {
//             $pull: { notifications: {message, sender} },
//         })
//         res.status(200).json(response)
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

router.delete("/agencies/:id", async (req, res) => {
    try {
        const response = await Agency.findByIdAndRemove(req.params.id);
        if (req.session.currentUser.email === response.email) {
        res
          .status(200)
          .json({ message: `Agency ${req.params.id} was deleted`});
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
})


module.exports = router;