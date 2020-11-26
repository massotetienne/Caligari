const bcrypt = require('bcrypt')
const User = require('../../database/models/User')

module.exports = {

    get: (req, res) => {
        res.render('log')
    },
    post: (req, res) => {

        const {
            email,
            password
        } = req.body;
        const sess = req.session;
        const isAdmin = req.session.isAdmin;
        
        User.findOne({
            email
        }, (error, user) => {
            if (user) {
                console.log(user.name);
                console.log(user.isAdmin);
                bcrypt.compare(password, user.password, (error, same) => {
                    if (!same) {
                        res.render('log', {
                            errorLogin: "une erreur est survenue veuillez verifier vos identifiant et mots de passe"
                        })

                    } else {

                        req.session.userId = user._id
                        // res.redirect('/')
                        if (user.isAdmin === true) {
                            console.log("je suis admin");
                            sess.isAdmin = user.isAdmin

                        }
                        res.render('log', {
                            success: "Bienvenue : " + user.name 
                            
                        })
                    }


                })


            }
         

        })


    },
    logout: (req, res) => {

        req.session.destroy(() => {
            res.clearCookie('cookie-sess')
            console.log(req.session)
            res.redirect('/')
        })
    }
}