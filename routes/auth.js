const router = require('express').Router();
const Agency = require('../models/Agency.model');
const Guide = require('../models/Guide.model');
const bcrypt = require("bcryptjs");

router.post('/agencies/signup', async (req, res) => {
    const { name, email, location, established, imageUrl, password, type } = req.body;
    if ( !name || !email || !location || !established || !imageUrl || !password ) {
        res.status(400).json({ message: "missing fields"});
        return;
}
    const userEmail = await Agency.findOne({ email });
    if (userEmail !== null) { 
    res.status(400).json({ message: 'Email already exists' });
    return;
}

    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const response = await Agency.create({ name, email, location, established, imageUrl, password: hashedPassword, type });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/tour-guides/signup', async (req, res) => {
    const { firstName, lastName, startedWorking, email, location, languages, bio, imageUrl, password, type } = req.body;
    if (!firstName || !lastName || !startedWorking || !email || !location || !languages || !bio || !imageUrl || !password) {
        res.status(400).json({ message: "missing fields"});
        return;
    }
    const userEmail = await Guide.findOne({ email });
    if (userEmail !== null) { 
    res.status(400).json({ message: 'Email already exists' });
    return;
}
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const response = await Guide.create({ firstName, lastName, startedWorking, email, location, languages, bio, imageUrl, password:hashedPassword, type });
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/tour-guides/login", async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        res.status(400),json({message: 'missing fields'})
        return;
        }

    const guide = await Guide.findOne({ email });
if (guide === null) {
res.status(401).json({message: 'invalid login'})
return;
}

if (bcrypt.compareSync(password, guide.password)) {
    //passwords match - login successfull
    req.session.currentUser = guide;
    res.status(200).json(guide);
} else {
    res.status(401).json({message: 'invalid login'});
}
});

router.post("/agencies/login", async (req, res) => {
    const { email, password } = req.body;
    

    if (email === "" || password === "") {
        res.status(400),json({message: 'missing fields'})
        return;
        }

    const agency = await Agency.findOne({ email });
    if (agency === null) {
        res.status(401).json({message: 'invalid login'})
        return;
        }

if (bcrypt.compareSync(password, agency.password)) {
    //passwords match - login successfull
    req.session.currentUser = agency;
    console.log(req.session);
    res.status(200).json(agency);
} else {
    res.status(401).json({message: 'invalid login'});
}
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'user logged out' })
});

router.get('/isLoggedIn', (req, res) => {
    if (req.session.currentUser) {
        res.status(200).json(req.session.currentUser);
    } else {
        res.status(200).json({});
    }
})

module.exports = router;