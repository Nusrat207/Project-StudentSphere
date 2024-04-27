const express = require('express')
const router = express.Router();

const user = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyzabcdef"

router.post("/createUser", [
    body('name', 'too short').isLength({ min: 3 }),
    body('student_id', 'not 9 digit iut id').isLength({ min: 9 }),
    body('dept', 'invalid').isLength({ min: 2 }),
    body('mail', 'invalid').isEmail(),
    body('phone', 'not a bangladeshi number').isLength({ min: 11 }),
    body('password', 'not valid').isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await user.create({
                name: req.body.name,
                student_id: req.body.student_id,
                dept: req.body.dept,
                mail: req.body.mail,
                phone: req.body.phone,
                password: secPassword
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


router.post("/loginUser",
    async (req, res) => {
        let student_id = req.body.student_id;
        let pw = req.body.password
        try {
            let userData = await user.findOne({ student_id });
            if (!userData) {
                return res.status(400).json({ errors: "this id is not registered with us" });
            }

            const pwCompare = await bcrypt.compare(pw, userData.password);
            if (!pwCompare) {
                return res.status(400).json({ errors: "incorrect password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authtoken = jwt.sign(data, jwtSecret);

            return res.json({ success: true, authtoken: authtoken, userData: userData });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/updateUser/:student_id", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { currentPw, dept, mail, phone, newPw } = req.body;

    try {
        const existingUser = await user.findOne({ student_id: req.params.student_id });
        //console.log(existingUser);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const pwCompare = await bcrypt.compare(currentPw, existingUser.password);
        if (!pwCompare) {
            return res.status(400).json({ errors: "incorrect password" });
        }

        if (dept.isLength>=2) existingUser.dept = dept;
        if (mail) existingUser.mail = mail;
        if (phone.isLength==11) existingUser.phone = phone;
        if (newPw.isLength>6) {
            const salt = await bcrypt.genSalt(10);
            existingUser.password = await bcrypt.hash(newPw, salt);
        }

        await existingUser.save();

        const updatedData = await user.findOne({ student_id: req.params.student_id });
        res.json({ success: true, message: "User data updated successfully", updatedData: updatedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;

/*  [
    body('dept').optional().isLength({ min: 2 }).withMessage('invalid'),
    body('mail').optional().isEmail().withMessage('invalid'),
    body('phone').optional().isLength({ min: 11 }).withMessage('not a bangladeshi number'),
    body('newPw').optional().isLength({ min: 6 }).withMessage('not valid')
],*/