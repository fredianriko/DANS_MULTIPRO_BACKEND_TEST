
const bcrypt = require('bcrypt')

exports.encryptPassword = async (password) => {

    const saltRound = 10
    

    const encryptedPasswordHashed = await bcrypt.hashSync(password, saltRound, (err,hash ) => {
        return hash
    })

    return encryptedPasswordHashed

}