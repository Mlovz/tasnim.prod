import jwt from "jsonwebtoken";

export const {
    ACTIVE_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
} = process.env;

export const generateActiveToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVE_TOKEN_SECRET, {
        expiresIn: "5m",
    });
};

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

export const generateRefreshToken = (payload, res) => {
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });

    return refresh_token;
};
