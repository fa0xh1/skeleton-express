import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../src/libs/utils'
import { injectable } from 'inversify'

interface authUser {
  id: string
  username: string
}

@injectable()
export class AuthMiddleware {
  public checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.get('Authorization')
    let jwtPayload
    // console.info(JWT_SECRET)
    //Try to validate the token and get data
    try {
      jwtPayload = <authUser>jwt.verify(token.substring(4), JWT_SECRET)
      res.locals.jwtPayload = jwtPayload
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send('Unauthorized')
      return
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { id, username } = jwtPayload
    const newToken = jwt.sign({ id, username }, JWT_SECRET, {
      expiresIn: '1h',
    })
    res.setHeader('token', newToken)

    //Call the next middleware or controller
    next()
  }
}
