import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { Repository } from 'typeorm'
import { User } from '../../entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [CreateUserUseCase, Repository<User>],
})
export class UserModule { }
