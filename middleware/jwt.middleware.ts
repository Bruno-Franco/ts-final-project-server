import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export interface CustomRequest extends Request {
	token: string | JwtPayload
}

// import { RequestCreateUpdateUser } from '../src/types/user.requests'
const secret = process.env.TOKEN_SECRET
// Instantiate the JWT token validation middleware
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	try {
		// Get the token string from the authorization header - "Bearer eyJh5kp9..."
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1]

			// Verify the token. Returns payload if the token is valid, otherwise throws an error
			const payload = jwt.verify(token, secret)

			// Add payload to the request object as req.payload for use in next middleware or route
			;(req as CustomRequest).token = payload
			// Call next() to pass the request to the next middleware function or route
			next()
		}
	} catch (error) {
		// We catch the error here and return a 401 status code and an error message
		// The middleware throws an error if unable to validate the token. It throws an error if:
		// 1. There is no token
		// 2. Token is invalid
		// 3. There is no headers or authorization in req (no token)
		res.status(401).json('token not provided or not valid')
	}
}

// Export the middleware so that we can use it to create protected routes
export { isAuthenticated }
