const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const userController = require('../controllers/userController');

login = async (req, res, next) => {
    const userInput = req.body;
    const userTarget = await userController.getUserByEmail(userInput.email).then((result) => {return result});

    console.log(userTarget);
    console.log(userInput);

    // if(userTarget) {
    //     if(userTarget.password)
    // }
    
    
    if(Admin.isAdmin(req.body)) {
        req.session.user = req.body;
        res.redirect("/admin");
        return next();
    }

    req.session.messages = ["Erro ao realizar login!"];
    res.redirect("/login");
}

// Cria o cookie de "lembrar-me" do usuário.
const setCookies = (req, res, next) => {
    if (req.body.rememberUser) {
        res.cookie("email", req.body.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
    } else {
        res.clearCookie("email");
    }

    return next()
}

const logout = (req, res, next) => {
    req.session.user = null;
    Acess.userLogout();
    res.redirect("/")
}

router.post("/login", setCookies, login);
router.get("/logout", logout);

module.exports = router;