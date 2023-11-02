import db from '../models/index'

const uploadUserAvatar = async (avatar) => {
    await db.Users.update({

    },
    {
        where: {  }
    }
    
    )
}

module.exports = {
    uploadUserAvatar
}