// THIS FUNCTION CATCHES ERRORS IN ASYNC FUNCTIONS
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}