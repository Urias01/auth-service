import { UserRole } from "src/entities/enums/user-role.enum"

export class CreateUserRequest {
  name: string
  email: string
  password: string
  phone?: string
  role?: UserRole
}
