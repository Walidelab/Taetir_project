import express from "express";

const router = express.Router();

import { signupController  , ChangePassword , refreshToken , verifyOTP , getUser} from "../controllers/userController.js";
import { getProfileByUserId } from "../services/userService.js";
import { protect } from "../middleware/protect.js";
import { sendOTP } from "../controllers/userController.js"
import passport from "passport";


router.post("/signup", signupController);

router.post("/send-otp", sendOTP);
router.post("/change-password", ChangePassword);
router.post("/verify-otp",  verifyOTP);

router.post('/login' , (req, res, next) => {
    passport.authenticate('local'  , (err , user , info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('DEBUG: User not found in database.');
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log('DEBUG: User found in database:', user.email);
        req.logIn(user, async (err) => {
            if (err) {
                return next(err);
            }
            const profile = await getProfileByUserId(user.id);
            return res.status(200).json({ message: 'Login successful', user, profile });
        });
    })(req, res, next);
});

router.get('/current_user', async (req, res) => {

  if (req.user) {
    const profile = await getProfileByUserId(req.user.id) ;
    res.status(200).json({ user: req.user, profile: profile });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

export default router;
