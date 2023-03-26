const { getUser } = require("../service/authStore");

async function restrictUsertoLogedIn(req, res, next) {
    //agar hai tab he read kare warna nhi
    const userID = req.cookies?.uid;
    if (!userID) return res.redirect("/login");

    const user = getUser(userID);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userID = req.cookies?.uid;

    const user = getUser(userID);
    req.user = user;

    next();
}


module.exports = {
    restrictUsertoLogedIn,
    checkAuth
}