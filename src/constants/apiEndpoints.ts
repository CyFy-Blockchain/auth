import { AdminLoginRequest } from '@app/modules/admin/dto/admin.dto';
import { ContractCallRequest } from '@app/modules/contracts/dto/contracts.dto';
import { UserRole } from '@app/modules/users/dto/users.enum';

// User Signup
export interface RegisterUserRequestBody {
  username: string;
  orgName: string;
  role: UserRole;
  certMetadata: string;
  attr?: string;
}

export interface RegisterUserResponse {
  secret: string;
  publicKey: string;
  privateKey: string;
}

// User Login
export interface UserLoginRequestBody {
  publicKey: string;
  privateKey: string;
}

export interface UserLoginResponse {
  userId: string;
}

// Admin Login
export interface AdminLoginResponse {
  privateKey: string;
  publicKey: string;
}

// Create a mapping interface for URLs
export interface ApiEndpoints {
  '/api/v1/auth/signup': {
    request: RegisterUserRequestBody;
    response: RegisterUserResponse;
  };
  '/api/v1/auth/login': {
    request: UserLoginRequestBody;
    response: UserLoginResponse;
  };
  '/api/v1/auth/enroll': {
    request: AdminLoginRequest;
    response: AdminLoginResponse;
  };
  '/api/v1/auth/call-contract': {
    request: ContractCallRequest;
    response: any; // Replace with actual response type
  };
}
