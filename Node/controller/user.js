const Users = require('../model/user')
const record = require('../model/data')
var jwt = require('jsonwebtoken');
require('dotenv').config()
const fs = require('fs');


exports.singup = (async (req, res) => {
    console.log(req.body)
    try {
        const { name, email, password, username, confirmpasword, role } = req.body
        const lastuserid = await Users.findOne({}, "userId").sort({ userId: -1 });
        const newUserId = lastuserid ? lastuserid.userId + 1 : 1;
        console.log("newuserID", newUserId)
        let isAlready = await Users.findOne({ username: username });
        console.log(isAlready)
        if (isAlready) {
            return res.status(400).json({
                msg: "That user already exisits!",
                status: true
            });
        }
        console.log("last", lastuserid)

        //        Insert the new user if they do not exist yet
        let user = new Users({
            username: username,
            userId: newUserId,
            name: name,
            email: email,
            role: role,
            password: password,
            confirmpasword: confirmpasword
        });
        const results = await user.save();

        console.log("result", results);
        if (results) {
            return res.json({
                msg: "Successfully created !!",
                user: results,
                status: 200
            });
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
});






exports.Login = (async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await Users.findOne({ username: username });
        const isPassword = await Users.findOne({ password: password });
        console.log(user, isPassword)
        if (!user || !isPassword) {
            res.json({
                status: false,
                msg: "Invalid login or password"
            });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });
        console.log(token)
        res.json({
            status: 200,
            user: user,
            msg: "Login successfully !!",
            token: token
        });


    } catch (error) {
        console.log(error)
        res.json({
            error: error,
            msg: "Not Login",
            status: false
        });
    }
})

exports.data = (async (req, res) => {
    console.log("res", req.body);
    try {
        const { name, email, age, role } = req.body;
        const query = new record({
            name: name,
            email: email,
            age: age,
            role: role
        })

        const result = await query.save();

        console.log("result",result)
        res.json({
            msg: "Successfully Data !!",
            user: result,
            status: 200
        });

    } catch (error) {
        console.log(error)
        res.json({
            msg: "Successfully Data !!",
            error: error,
            status: 200
        });
    }

})



exports.listdata = (async (req, res) => {
    console.log(req.body)
    try {
        const records = await record.find()
        console.log("record", records)
        res.json({
            status: 200,
            Data: records,
            msg: "Lisiting successfully !!",
        });
    } catch
    (error) {
        res.json({
            error: error,
            msg: "Not Listing",
            status: false
        });
    }
})



exports.update = async (req, res) => {
    console.log("id", req.params.id);
    console.log(req.body);

    try {
        const id = req.params.id;
        const { name, email, age, role } = req.body; 

        const datalisting = await record.findByIdAndUpdate(id, {
            name: name,
            email: email,
            age: age,
            role: role
        });

        console.log("record", datalisting);

        if (!record) {
            // Handle the case where the record with the given ID is not found
            res.status(404).json({
                status: 404,
                msg: "Record not found"
            });
            return;
        }

        res.json({
            status: 200,
            data: datalisting,
            msg: "Record updated successfully !!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            msg: "Error updating record",
            status: 500
        });
    }
};





exports.Delete = async (req, res) => {
    console.log("id", req.params.id);
    try {
        const id = req.params.id;

        const deleterecord = await record.findByIdAndDelete(id);

        if (!record) {
            res.status(404).json({
                status: 404,
                msg: "Record not found"
            });
            return;
        }

        console.log("record", deleterecord);

        res.json({
            status: 200,
            data: deleterecord,
            msg: "Record deleted successfully !!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            msg: "Error deleting record",
            status: 500
        });
    }
};


exports.list = (async (req, res) => {
    console.log(req.body)
    try {
        const record = await Users.find()
        console.log("record", record)
        res.json({
            status: 200,
            Data: record,
            msg: "Lisiting successfully !!",
        });
    } catch
    (error) {
        res.json({
            error: error,
            msg: "Not Listing",
            status: false
        });
    }
})












