const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/FootDiets")
    .then(() => {
        console.log("MongoDB connect");
    })
    .catch(() => {
        console.log("Fail to connect");
    })


const LoginSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        timestamps: true
    },
    gender: {
        type: String,
        possibleValues: ['Male', 'Female', 'Other']
    },
    profession: {
        type: String,
        timestamps: true
    },
    password: {
        type: String,
        required: true
    },
    passwordCheck: {
        type: String,
        required: true
    },
    profileimg: {
        type: Number,
        required: true

    }

})





const dietuserdata = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true

    },
    height: {
        type: Number,
        required: true

    },
    age: {
        type: Number,
        required: true

    },
    bloodgroup: {
        type: String,
        required: true

    },
    diseases: {
        type: String,
        required: true

    },
    allergies: {
        type: String,
        required: true

    },

    eattinghab: {
        type: String,
        possibleValues: ['veg', 'nonveg']
    },
    goalwig: {
        type: String,
        possibleValues: ['gain', 'loss']
    }

})


const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true
    },

    proteins: {
        type: Number,
        required: true

    },
    carbs: {
        type: Number,
        required: true

    },

    fats: {
        type: Number,
        required: true

    },
    fiber: {
        type: Number,
        required: true

    }
})

const foodinfo = new mongoose.model("fooddiets", foodSchema)

const loginnewuser = new mongoose.model("Userinfos", LoginSchema)

const userdiet = new mongoose.model("UserDietData", dietuserdata)

module.exports = {
    foodinfo,
    loginnewuser,
    userdiet
};



