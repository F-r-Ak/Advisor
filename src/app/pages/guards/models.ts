export enum Action {
  View,
  Add,
  Update,
  Delete,
  Anonymous
}

export class RouteData {
  name = '';
  permission: Action | string = Action.View;

  get IsAnonymous(): boolean {
    return this.permission === Action.Anonymous;
  }
}

export class TokenData {
  public Token = '';
  public Expiry: Date = new Date();

  public IsExpired(): boolean {
    return new Date() > new Date(this.toDateTime(this.Expiry));
  }

  public toDateTime(secs) {
    const t = new Date();
    t.setSeconds(secs);
    return t;
  }
}

export class Permission {
  public View = true;
  public Add = false;
  public Edit = false;
  public Delete = false;

  constructor() {}
  public static get Denied(): Permission {
    return Object.assign(new Permission(), {
      Add: false,
      Update: false,
      Delete: false,
      View: false
    });
  }
  public static get FullAccess(): Permission {
    return Object.assign(new Permission(), {
      Add: true,
      Update: true,
      Delete: true,
      View: true
    });
  }

  public Can(ac: number | string): boolean {
    if (ac === Action.Anonymous) {
      return true;
    }

    switch (ac) {
      case 2:
        return this.Delete;

      case 3:
        return this.Edit;

      case 1:
        return this.Add;

      case 0:
        return this.View;

      default:
        return this.View;
    }
  }
}

export class RoleResult {
  AppName? = '';
  AppId? = 0;
  RoleName? = '';
  RoleNameAr? = '';
  RoleId? = 0;
  RoleCode? = '';
}

export class RoleData {
  roleName? = '';
  roleNameAr? = '';
  roleId? = 0;
  appId? = 0;
  code? = '';
}
