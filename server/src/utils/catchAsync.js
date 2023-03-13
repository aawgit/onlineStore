//Catching error in async functions to avoid using the try catch block everywhere
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

