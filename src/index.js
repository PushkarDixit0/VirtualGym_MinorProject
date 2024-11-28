const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const {foodinfo, loginnewuser, userdiet } = require("./mongodb"); // Import both models correctly

const templatePath = path.join(__dirname, '../templetes');

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/bot", (req, res) => {
    res.render("bot");
});

app.post("/signup", async (req, res) => {
    const userinfodata = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        profession: req.body.profession,
        password: req.body.password,
        passwordCheck: req.body.passwordCheck,
        profileimg: req.body.profileimg
    };

    const dietinfo = {
        email: req.body.email,
        weight: req.body.weight,
        height: req.body.height,
        age: req.body.age,
        bloodgroup: req.body.bloodgroup,
        diseases: req.body.diseases,
        allergies: req.body.allergies,
        eattinghab: req.body.eattinghab,
        goalwig: req.body.goalwig
    };

    try {
        const existingUser = await loginnewuser.findOne({ email: req.body.email });
               if (existingUser) {
            return res.send("User already exists");
        }

        if (req.body.password === req.body.passwordCheck) {
            await loginnewuser.create(userinfodata); // Use create instead of insertMany
            await userdiet.create(dietinfo); // Use create instead of insertMany

            return res.redirect(`/profile?email=${req.body.email}&gender=${req.body.gender}&fname=${req.body.fname}&lname=${req.body.lname}&profession=${req.body.profession}&weight=${req.body.weight}&height=${req.body.height}&age=${req.body.age}&bloodgroup=${req.body.bloodgroup}&diseases=${req.body.diseases}&allergies=${req.body.allergies}&eattinghab=${req.body.eattinghab}&goalwig=${req.body.goalwig}&profileimg=${req.body.profileimg}`);
        } else {
            return res.send("Check Password");
        }
    } catch (error) {
        console.error("Error occurred during signup:", error);
        return res.send("Error occurred during signup");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await loginnewuser.findOne({ email: req.body.email });
        const userinfop = await userdiet.findOne({ email: req.body.email });
        if (user && user.password === req.body.password) {
            return res.redirect(`/profile?email=${req.body.email}&gender=${user.gender}&fname=${user.fname}&lname=${user.lname}&profession=${user.profession}&weight=${userinfop.weight}&height=${userinfop.height}&age=${userinfop.age}&bloodgroup=${userinfop.bloodgroup}&diseases=${userinfop.diseases}&allergies=${userinfop.allergies}&eattinghab=${userinfop.eattinghab}&goalwig=${userinfop.goalwig}&profileimg=${user.profileimg}`);
       
        } else {
            return res.send("Password Wrong");
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.send("Wrong Details");
    }
});

app.post("/bot", async (req, res) => {
    try {
        const food = await foodinfo.findOne({ foodname: req.body.foodname });
       
        
        return res.redirect(`/botanswer?foodname=${req.body.foodname}&proteins=${food.proteins}&carbs=${food.carbs}&fats=${food.fats}&fiber=${food.fiber}`)
       
        
    } catch (error) {
        console.error("Error occurred during login:", error);
        return res.send("Wrong Details");
    }
});


app.get("/profile", async (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.error("Error occurred while rendering profile:", error);
        res.send("Error occurred while rendering profile");
    }
});

app.get("/botanswer", async (req, res) => {
    try {
        res.render("botanswer");
    } catch (error) {
        console.error("Error occurred while rendering profile:", error);
        res.send("Error occurred while rendering profile");
    }
});





































app.get("/form", (req, res) => {
    res.render("form")
})



app.post("/form", async (req, res) => {

    const fooddata = {
                foodname: req.body.foodname,
        
                proteins: req.body.proteins,
                carbs: req.body.carbs,
                fats: req.body.fats,
                fiber: req.body.fiber
        
            }
           
    const exestingfood = await foodinfo.findOne({ foodname: req.body.foodname})
    if (exestingfood) {
        res.send("food alredy exites");
    }
    try {
            await foodinfo.insertMany([fooddata]);
            res.render("done");
        

    }
    catch {
        res.send("Enter Detail error")
    }

})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


