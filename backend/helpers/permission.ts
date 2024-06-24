import User from '../models/user.model';

const uploadProductPermission = async (userId: any) => {
  const user: any = await User.findById(userId);
  if (user.role !== 'admin') {
    return false;
  }
  return false;
};

export { uploadProductPermission };
