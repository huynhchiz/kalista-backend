import db from '../models/index.js'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

const checkEmailExisted = async (email) => {
    let user = await db.Users.findOne({
       where: { email: email },
    });
    return user ? true : false
};

 const checkPhoneExisted = async (phone) => {
    let user = await db.Users.findOne({
       where: { phone: phone },
    });
    return user ? true : false
};

const registerUser = async (userData) => {
    try {
      let isEmailExisted = await checkEmailExisted(userData.email);
      if (isEmailExisted) {
         return {
            EM: 'Email is already exist',
            EC: '-2',
            DT: '',
         };
      }
      let isPhoneExisted = await checkPhoneExisted(userData.phone);
      if (isPhoneExisted) {
         return {
            EM: 'Phone number is already exist',
            EC: '-3',
            DT: '',
         };
      }

      let hassPass = hashPassword(userData.password);
      await db.Users.create({
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        password: hassPass,
        groupId: 4, //mac dinh la guess neu register
      });

     return {
        EM: 'User is created successfully',
        EC: '0',
        DT: '',
     };
    } catch (error) {
        console.log('error from registerUser service: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-2',
            DT: '',
         };   
    }
}

module.exports = {
    registerUser,
}