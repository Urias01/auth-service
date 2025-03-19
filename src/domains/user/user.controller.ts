import { Body, Controller, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserRequest } from './requests/create-user.request'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { USER } from '../../common/constants/prefix'

@ApiTags(USER)
@Controller(USER)
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Sign up successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 409 })
  async signUp(@Body() createUserRequest: CreateUserRequest) {
    return await this.createUserUseCase.execute(createUserRequest)
  }
}
