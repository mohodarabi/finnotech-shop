import { TokenType } from "../enum/token-type.enum";

export interface TokenPayload {
  userId: string;
  tokenType: TokenType;
}
