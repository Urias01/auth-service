import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserRequest } from '../requests/create-user.request'
import { User } from '../../../entities/user.entity'
import { ERRORS } from '../../../common/constants/error'
import { AlreadyExists } from '../../../common/handles/errors/already-exists'
import { UserRole } from '../../../entities/enums/user-role.enum'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async execute(userRequest: CreateUserRequest) {
    const hashPassword = await bcrypt.hash(
      userRequest.password,
      10,
    )

    const user = await this.userRepository.findOne({
      where: { email: userRequest.email },
    })

    if (user) {
      throw new AlreadyExists(
        `${ERRORS.USER.ENTITY.ALREADY_EXISTS}, email: ${userRequest.email}`,
      )
    }

    const newUser = this.userRepository.create({
      name: userRequest.name,
      email: userRequest.email,
      password: hashPassword,
      role: UserRole.CUSTOMER,
      phone: userRequest.phone ?? undefined,
    })

    return this.userRepository.save(newUser)
  }
}
