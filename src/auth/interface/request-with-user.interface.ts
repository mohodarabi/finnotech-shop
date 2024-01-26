import { Request } from 'express';
import { UserDocument } from 'src/user/model/user.schema';

export interface RequestWithUser extends Request {
  user: UserDocument;
}
