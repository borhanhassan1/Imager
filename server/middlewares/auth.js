import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!req.body) req.body = {};
  if (!token) {
    return res.json({ status: false, message: "Not Authorized." });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ status: false, message: "Not Authorized" });
    }
    next();
  } catch (err) {
    return res.json({
      status: false,
      message: err.message,
    });
  }
};

export default userAuth;
