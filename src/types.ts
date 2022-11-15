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

  // Service Layer
  AuthService: Symbol.for('AuthService'),
  UserService: Symbol.for('UserService'),
  RoleService: Symbol.for('RoleService'),
  PermissionService: Symbol.for('PermissionService'),
  AccessControllService: Symbol.for('AccessControllService'),

  // UserRepository: Symbol.for('UserRepository'),
}

export { TYPES }
