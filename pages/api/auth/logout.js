import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
    req.session.destroy();
    res.send("Logged out");
}

export default withIronSession(handler, {
    cookieName: "Showroom",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
});