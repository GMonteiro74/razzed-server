const router = require('express').Router();
const Guide = require('../models/Guide.model');
const fileUpload = require('../config/cloudinary');
const Tour = require('../models/Tour.model');

router.get('/tour-guides', async (req, res) => {
    try {
       const guides = await Guide.find();
       res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
});

router.get('/tour-guides/my-tours', async (req, res) => {
    console.log(req.session.currentUser);
    try {
        const response = await Tour.find( { guide: req.session.currentUser } );
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}
)

router.get('/tour-guides/:id', async (req, res) => {
    try {
        const response = await Guide.findById(req.params.id);
        if (req.session.currentUser.email === response.email || req.session.currentUser.type === 'agency') {
        res.status(200).json(response);
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/tour-guides/:id', async (req, res) => {
    const { firstName, lastName, startedWorking, email, location, languages, bio, imageUrl } = req.body;
    if (!firstName || !lastName || !startedWorking || !email || !location || !languages || !bio || !imageUrl ) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    try {
          
        await Guide.findByIdAndUpdate(req.params.id, { firstName, lastName, startedWorking, email, location, languages, bio, imageUrl });        
        res.status(200).json(`Guide ${req.params.id} was updated`);
                
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/tour-guides/:id/notification/delete', async (req, res) => {
    try {
        const response = await Guide.findByIdAndUpdate(req.params.id, {
            $pull: { notifications: { "sender": req.params.senderID}}
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/tour-guides/:id/notification/:tourID', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await Guide.findByIdAndUpdate(req.params.id, {
            $push: { notifications: { "sender": req.session.currentUser,
                "message":message }, tours: req.params.tourID}
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/tour-guides/:id/:tourID', async (req, res) => {

    try {
        const response = await Guide.findByIdAndUpdate(req.params.id, {
            $pull: { tours: req.params.tourID}
        })
        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.delete("/tour-guides/:id", async (req, res) => {
    try {
        const response = await Guide.findByIdAndRemove(req.params.id);
        if (req.session.currentUser.email === response.email) {
        res
          .status(200)
          .json({ message: `Guide ${req.params.id} was deleted`});
        } else {
            res.status(401).json('Unauthorized');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
})

router.post('/upload', fileUpload.single('file'), (req, res) => {
    try {
        res.status(200).json({ fileUrl: req.file.path });
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})



module.exports = router;