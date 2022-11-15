interface Permission {
  id: string
  name: string
}

interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface UserSession {
  id: string
  role?: Role[]
  permission?: Permission[]
}
export interface IAdminPrincipal {
  __admin: 'admin'
  id: string
}

export interface IUserPrincipal {
  __admin: 'user'
  id: string
}

export class Authorization {
  constructor(private props: UserSession) {}
  public static create(props: UserSession): Authorization {
    const instance = new Authorization(props)
    return instance
  }

  public unmarshal(): UserSession {
    return {
      id: this.id,
      role: this.role,
      permission: this.permission,
    }
  }

  // public checkRole(name: string) {
  //   return this.role?.find((item) => item.name == name)
  // }

  get id(): string {
    return this.props.id
  }

  get role(): Role[] | undefined {
    return this.props.role
  }

  get permission(): Permission[] | undefined {
    return this.props.permission
  }
}

// export const authorizeAdmin = (principal: UserSession): IAdminPrincipal => {
//   // check branding di sini
// }
