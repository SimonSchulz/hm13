import { UserDocument } from '../../infrastructure/schemas/user.schema';
import { UserViewModel } from '../../dto/user.view-model';

export function mapToUserViewModel(user: UserDocument): UserViewModel {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt,
  };
}
