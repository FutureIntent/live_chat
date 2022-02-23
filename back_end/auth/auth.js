
function validate(req, res, next) {
    if (!req.session.username || !req.session.auth) return res.status(400).json({ status: false, message: 'No auth' });
    next();
}

module.exports = validate;
