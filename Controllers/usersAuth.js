const express = require(`express`)
const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const db = require(`../database`)

const adminAuth = () => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Login As Admin' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded;
       
        db.query(`select * from users where id = ?`, [decoded.Id]
            , (err, data) => {
              
                if (decoded.tokenVersion !== data[0].jwt_version) {
                    console.log(`Token Not Match`);
                    return res.status(403).json({ error: `Invalid Token` })

                } else {
                    db.query(`select role_name from user_roles where email = ?`,
                        [data[0].email],
                        (err, roleData) => {
                            if (err || roleData.length === 0) {
                                console.log(`Invalid please Login as an Admin`);
                                return res.status(403).json({ error: `No access, Invalid please Login as an Admin` })
                            }
                            else {
                                const datarole = roleData[0].role_name.toLowerCase();

                                if (datarole !== "admin") {
                                    console.log(`Invalid Login as an Admin`);
                                    return res.status(403).json({ error: `No access, Invalid Login as an Admin` })

                                }
                                else {
                                    next();
                                }

                            }


                        })
                }
            })




    } catch (error) {
        if (error.name === "TokenExpiredError") {


            return res.status(403).json({ error: `Session Expired, Please login` })

        }
        console.error(error);
        // console.log(error);

        return res.status(403).json({ error: 'Invalid token' });
    }
}

const userAuth = () => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log(`No Access Please Login to continue`);
        return res.status(401).json({ error: `No Access Please Login to continue` })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            req.user = decoded;
            // console.log(req.user);
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                console.log(error.name, error.message);
                return res.status(403).json({ error: `Session Expired, Please login` })
            } else {
                console.error(error);
                console.log(error.name, error.message);
                return res.status(403).json({ error: 'Invalid token' });
            }
        }
    }
}
module.exports = { adminAuth, userAuth };