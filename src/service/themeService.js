import db from '../models/index.js'

const getTheme = async (email) => {
    try {
        let user = await db.Users.findOne({
            where: { email: email },
         });
         let theme = await db.Themes.findOne({
            where: { id: user.themeId },
         });

         return {
            EM: 'Get user theme success',
            EC: '0',
            DT: {
                id: theme.id,
                name: theme.name
            },
         };

    } catch (error) {
        console.log('getTheme service err: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
         };   
    }
}

module.exports = {
    getTheme
}