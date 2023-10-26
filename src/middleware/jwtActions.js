import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'accesstokensecrethuynhchi'
const ACCESS_TOKEN_EXPRIES = process.env.ACCESS_TOKEN_EXPRIES || '30s'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshtokensecrethuynhchi'
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '60s'

const createJwt = (payload) => {
    let accessToken = null
    let refreshToken = null
    
    try {
        accessToken = jwt.sign(
            { ...payload, ['iat']: Math.floor(Date.now() / 1000) },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPRIES }
        );
        refreshToken = jwt.sign(
            { ...payload, ['iat']: Math.floor(Date.now() / 1000) },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRES }
        )
    } catch (error) {
        console.log('createJwt err: ', err);
    }

    return { accessToken, refreshToken }
}

module.exports = {
    createJwt
}
