const TYPES = {
  Logger: Symbol.for('Logger'),
  Database: Symbol.for('Database'),

  Server: Symbol.for('Server'),

  HTTPRouter: Symbol.for('HTTPRouter'),
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  PermissionMiddleware: Symbol.for('PermissionMiddleware'),

  // Impelementation Domain Service
  AuthManager: Symbol.for('AuthManager'),
  UserRepository: Symbol.for('UserRepository'),
  AccessControllManager: Symbol.for('AccessControllManager'),
  RoleRepository: Symbol.for('RoleRepository'),
  PermissionRepository: Symbol.for('PermissionRepository'),
  CompanyRepository: Symbol.for('CompanyRepository'),
  BankRepository: Symbol.for('BankRepository'),
  PaymentMethodRepository: Symbol.for('PaymentMethodRepository'),

  // Service Layer
  AuthService: Symbol.for('AuthService'),
  UserService: Symbol.for('UserService'),
  RoleService: Symbol.for('RoleService'),
  PermissionService: Symbol.for('PermissionService'),
  AccessControllService: Symbol.for('AccessControllService'),
  CompanyService: Symbol.for('CompanyService'),
  BankService: Symbol.for('BankService'),
  PaymentMethodService: Symbol.for('PaymentMethodService'),

  // UserRepository: Symbol.for('UserRepository'),
}

export { TYPES }
