export class CreateUserDto {
  username?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  image?: string;
  role?: string;
  is_verified?: boolean;
  phoneNumber: string;
}
