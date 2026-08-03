const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");


// Register User

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};



// Login User

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (
            user &&
            (await bcrypt.compare(
                password,
                user.password
            ))
        ) {

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });

        } else {

            res.status(401).json({
                message: "Invalid credentials",
            });

        }

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// Forgot Password — generates a reset token.
// NOTE: no email service (SMTP/nodemailer) is configured in this project,
// so the reset link is returned directly in the response instead of being
// emailed. Wire up an email provider here before shipping to production.
const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            // Don't reveal whether the email exists.
            return res.status(200).json({
                message:
                    "If that email is registered, a reset link has been generated.",
            });
        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

        await user.save();

        const resetUrl = `/reset-password/${resetToken}`;

        res.status(200).json({
            message:
                "If that email is registered, a reset link has been generated.",
            // Dev-only: since no email service is wired up, expose the link
            // directly so the flow is testable end-to-end.
            resetUrl,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

// Reset Password
const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Reset link is invalid or has expired.",
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: "Password reset successful. You can now log in.",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
};