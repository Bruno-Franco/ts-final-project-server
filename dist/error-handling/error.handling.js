"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.log('INSIDE ERROR HANDLING FUNCTION!!!');
    console.error('ERROR', req.method, req.path, err);
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
        console.log('INSIDE ERROR HANDLING FUNCTION - WHITH NO HEADER SENT!!!!');
        res.status(500).json({
            message: 'Internal server error. Check the server console',
        });
    }
}
function notFoundHandler(req, res, next) {
    // this middleware runs whenever requested page is not available
    res.status(404).json({
        message: `This route does not exist | ${req.method} with endpoint --> ${req.path} 404`,
    });
}
module.exports = {
    errorHandler,
    notFoundHandler,
};
