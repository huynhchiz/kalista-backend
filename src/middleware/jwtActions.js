import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'accesstokensecrethuynhchi'
const ACCESS_TOKEN_EXPRIES = process.env.ACCESS_TOKEN_EXPRIES || '30m'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshtokensecrethuynhchi'
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '1day'

const createAccessToken = (payload) => {
    let accessToken = null
    try {
        accessToken = jwt.sign(
            { ...payload, ['iat']: Math.floor(Date.now() / 1000) },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPRIES }
        )
    } catch (error) {
        console.log('createAccessToken err: ', err);
    }
    return accessToken
}

const createRefreshToken = (payload) => {
    let refreshToken = null
    try {
        refreshToken = jwt.sign(
            { ...payload, ['iat']: Math.floor(Date.now() / 1000) },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRES }
        )
    } catch (error) {
        console.log('createRefreshToken err: ', err);
    }
    return refreshToken
}

const verifyToken = (token, scretKey) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, scretKey);
    } catch (error) {
        console.log('verifyToken err:', error);
        if (error.toString().includes('expired')) {
            console.log('verifyToken err: expired token');
            decoded = -100;
        }
    }
    return decoded
}

const passCheckUserJwtPaths = [
    '/', '/login', '/logout', '/register', 
    '/refresh-token'
]
const checkUserJwt = (req, res, next) => {
    if (passCheckUserJwtPaths.includes(req.path)) return next();
    // if (passCheckUserJwtPaths.some(item => req.path.includes(item))) return next();

    let cookies = req.cookies; // get cookies from client
    if (cookies && cookies.accessToken) {
        let accessToken = cookies.accessToken;
        let refreshToken = cookies.refreshToken;

        let decodedAccessToken = verifyToken(accessToken, ACCESS_TOKEN_SECRET)

        if(decodedAccessToken && +decodedAccessToken !== -100) {
            req.user = decodedAccessToken;
            req.accessToken = accessToken;
            req.refreshToken = refreshToken;
            return next();
        }

        // Expired token
        if (decodedAccessToken && +decodedAccessToken === -100) {
            req.user = decodedAccessToken;
            return res.status(403).json({
               EC: -100,
               EM: 'Expired token',
               DT: '',
            });
        }

        return res.status(401).json({
            EC: -1,
            EM: 'Not authenticated user',
            DT: '',
        });

    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'No token found',
            DT: '',
        });
    }
}

const passCheckUserPermissionPaths = [
    '/', '/login', '/logout', '/register', 
    '/get-info', '/refresh-token'
]
const checkUserPermission = (req, res, next) => {
    if (passCheckUserPermissionPaths.includes(req.path)) return next();
    // if (passCheckUserPermissionPaths.some(item => req.path.includes(item))) return next();

    if (req.user && +req.user === -100) {
        return res.status(403).json({
           EC: -100,
           EM: 'Expired token',
           DT: '',
        });
    }

    if (req.user && +req.user !== -100) {
        let roles = req.user.userGroupWithRoles.roles;
        let currentUrl = req.path;

        if (!roles || roles.length === 0) {
            console.log('checkUserPermission: no roles found');
            return res.status(403).json({
               EC: -1,
               EM: `Your don't have permission to access`,
               DT: '',
            });
        }
        let canAccess = roles.some((role) => role.url === currentUrl || currentUrl.includes(role.url));
        if (canAccess) {
            next();
        } else {
            console.log("checkUserPermission: doesn't match any role");
            return res.status(403).json({
               EC: -1,
               EM: `Your don't have permission to access`,
               DT: '',
            });
        }
    } else {
        return res.status(401).json({
           EC: -1,
           EM: 'Not authenticated user',
           DT: '',
        });
    }    
}

const refreshNewToken = (refreshToken) => {
    let newAccessToken = null
    let newTokenData = {}

    let decodedRefToken = verifyToken(refreshToken, REFRESH_TOKEN_SECRET,)

    if (decodedRefToken && +decodedRefToken !== -100) {
        newAccessToken = createAccessToken(
            {
                userId: decodedRefToken.userId,
                email: decodedRefToken.email,
                username: decodedRefToken.username,
                userGroupWithRoles: decodedRefToken.userGroupWithRoles,
                ['iat']: Math.floor(Date.now() / 1000)
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPRIES }
        )
    }

    if (decodedRefToken && +decodedRefToken === -100) {
        return -101 //expired refresh token
    };

    newTokenData = {
        accessToken: newAccessToken,
        refreshToken: refreshToken,
        email: decodedRefToken.email,
        username: decodedRefToken.username,
        userGroupWithRoles: decodedRefToken.userGroupWithRoles,
        userId: decodedRefToken.userId
    };
    return newTokenData
}

module.exports = {
    createAccessToken, createRefreshToken, checkUserJwt, checkUserPermission, refreshNewToken
}
