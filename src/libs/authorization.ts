export interface UserSession {
  id: string
  role?: Record<string, string>[]
  permission?: Record<string, string>[]
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

  public checkRole(name: string) {
    return this.role?.find((item) => item.name == name)
  }

  public authorizeAdmin(): IAdminPrincipal {
    const role = this.role?.find((item) => item.name == 'admin')
    const admin: IAdminPrincipal = {
      __admin: 'admin',
      id: this.props.id,
    }
    return admin
  }

  get id(): string {
    return this.props.id
  }

  get role(): Record<string, string>[] | undefined {
    return this.props.role
  }

  get permission(): Record<string, string>[] | undefined {
    return this.props.permission
  }
}

// export const authorizeAdmin = (principal: UserSession): IAdminPrincipal => {
//   // check branding di sini
// }
