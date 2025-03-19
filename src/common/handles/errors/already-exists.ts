import { HttpException, HttpStatus } from '@nestjs/common'

export class AlreadyExists extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT)
  }
}
