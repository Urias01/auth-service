jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedpassword'),
}))
import * as bcrypt from 'bcrypt'
import { Test, TestingModule } from "@nestjs/testing"
import { User } from "../../../entities/user.entity"
import { Repository } from "typeorm"
import { CreateUserUseCase } from "./create-user.use-case"
import { getRepositoryToken } from "@nestjs/typeorm"
import { CreateUserRequest } from "../requests/create-user.request"
import { UserRole } from "../../../entities/enums/user-role.enum"
import { AlreadyExists } from '../../../common/handles/errors/already-exists'


describe("Create User Use Case", () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          }
        }
      ]
    }).compile()

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be able to create a new user successfully', async () => {
    const userRequest: CreateUserRequest = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    }

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null)
    jest.spyOn(userRepository, 'create').mockImplementation((user) => {
      return Object.assign(new User(), user)
    })
    jest.spyOn(userRepository, 'save').mockResolvedValue({
      id: 1,
      ...userRequest,
      password: 'hashedpassword',
      role: UserRole.CUSTOMER,
      addresses: []
    })

    const result = await createUserUseCase.execute(userRequest)

    expect(bcrypt.hash).toHaveBeenCalled()
    expect(userRepository.create).toHaveBeenCalledWith({
      name: userRequest.name,
      email: userRequest.email,
      password: 'hashedpassword',
      role: UserRole.CUSTOMER,
      phone: userRequest.phone,
    })
    expect(userRepository.save).toHaveBeenCalled()
    expect(result).toEqual({
      id: 1,
      ...userRequest,
      password: 'hashedpassword',
      role: UserRole.CUSTOMER,
      addresses: []
    });
  })

  it('shoud be able to throw Already Exists Error', async () => {
    const userRequest: CreateUserRequest = {
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password',
    }

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(new User())

    await expect(createUserUseCase.execute(userRequest)).rejects.toThrow(AlreadyExists)
  })

})