import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

function errorHandler(
	err: ErrorRequestHandler,
	req: Request,
	res: Response,
	next: NextFunction
) {
	// whenever you call next(err), this middleware will handle the error
	// always logs the error
	console.log('INSIDE ERROR HANDLING FUNCTION!!!')

	console.error('ERROR', req.method, req.path, err)

	// this is for wrong email!!
	if (req.path === '/auth/login') {
		res.status(403).json({
			message: 'No access!',
		})
	}
	// only render if the error ocurred before sending the response
	if (!res.headersSent) {
		console.log('INSIDE ERROR HANDLING FUNCTION - WHITH NO HEADER SENT!!!!')
		res.status(500).json({
			message: 'Internal server error. Check the server console',
		})
	}
}

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	// this middleware runs whenever requested page is not available

	res.status(404).json({
		message: `This route does not exist | ${req.method} with endpoint --> ${req.path} 404`,
	})
}

module.exports = {
	errorHandler,
	notFoundHandler,
}
