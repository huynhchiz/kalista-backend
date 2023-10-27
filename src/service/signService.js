import db from '../models/index.js'
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { createAccessToken, createRefreshToken } from '../middleware/jwtActions.js'

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
        groupId: 2, //mac dinh user = 2
        themeId: 1, //mac dinh theme light
      });

     return {
        EM: 'User is created successfully',
        EC: '0',
        DT: '',
     };
    } catch (error) {
        console.log('registerUser service err: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
         };   
    }
}

const getUserGroupWithRoles = async (user) => {
   let group = await db.Groups.findOne({
      where: { id: +user.groupId },
      attributes: ['id', 'name', 'description'],
      raw: true,
   });

   let roles = await db.Roles.findAll({
      attributes: ['id', 'url', 'description'],
      include: { model: db.Groups, where: { id: +user.groupId }, attributes: [], through: { attributes: [] } },
      throught: { attributes: [] },
      raw: true,
      nest: true,
   });
   
   return group && roles ? { ...group, roles } : {};
}
const checkPassword = (inputPassword, hashPassword) => {
   return bcrypt.compareSync(inputPassword, hashPassword);
};
const loginUser = async (userData) => {
   try {
      let user = await db.Users.findOne({
         where: {
            [Op.or]: [{ email: userData.loginValue }, { phone: userData.loginValue }],
         },
      });

      if(user) {
         let isCorrectPassword = checkPassword(userData.password, user.password)
         if(isCorrectPassword) {
            console.log('Correct password');

            let userGroupWithRoles = await getUserGroupWithRoles(user)
            let payload = {
               email: user.email,
               username: user.name,
               userGroupWithRoles,
            }
            let accessToken = createAccessToken(payload)
            let refreshToken = createRefreshToken(payload)
            
            return {
               accessToken,
               refreshToken,
               EM: 'Correct password / success login',
               EC: '0',
               DT: {
                  accessToken,
                  refreshToken,
                  userGroupWithRoles,
                  email: user.email,
                  phone: user.phone,
                  username: user.username
               }
            }
         } else {
            console.log('Incorrect password');
            return {
               EM: 'Incorrect password',
               EC: '-1',
               DT: '',
            }
         }

      } else {
         console.log('Incorrect email / phone');
         return {
            EM: 'Incorrect email / phone',
            EC: '-1',
            DT: '',
         }
      }

   } catch (error) {
      console.log('loginUser service err: ', error);
      return {
         EM: 'Something wrong in service',
         EC: '-5',
         DT: '',
      }; 
   }
}

module.exports = {
    registerUser, loginUser, getUserGroupWithRoles
}