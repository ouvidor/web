// Add support for svg imports
declare module "*.svg" {
  const content: any;
  export default content;
}

/**
 * Interfaces importantes para as regras de negócio
 */

interface ICategory {
  id: number
  title: string
  created_at: string
  updated_at: string
}

interface IType {
  id: number
  title: string
  created_at: string
  updated_at: string
}

interface IManifestation {
  id: number
  title: string
  description: string
  categories: ICategory[]
  type: IType
  date: string
  location: string
  read: boolean
  latitude: string
  longitude: string
  secretary_id?: number
  user_id: number
  type_id: number
  protocol: string
  created_at: string
  updated_at: string
}

interface IManifestationStatus {
  id: number
  title: string
  description: string
  created_at: string
  status: {
    title: string,
  }
  created_at: string
  updated_at: string
}

interface IPrefecture {
  location: string
  telephone: string
  email: string
  attendance: string
  site: string
  created_at: string
  updated_at: string
}

interface IOmbudsman {
  location: string
  telephone: string
  email: string
  attendance: string
  site: string
  created_at: string
  updated_at: string
}

interface IRole {
  id: number
  title: "master" | "admin" | "citizen"
  level: 1 | 2 | 3
}

interface IStatus {
  title: string
  id: number
}

interface ISecretary {
  id: number
  title: string
  email: string
}

interface IMailReturn {
  message: string
}

interface IStore {
  token: string
  isSigned: boolean
  profile?: IProfile
}

interface IProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  role: IRole[]
}

interface IToken {
  role: IRole[]
}

interface ISession {
  profile: IProfile
  token: string
}

interface IGenericItem {
  id: number
  title: string
}

interface IToken {
  id: number
  role: IRole[]
  iat: number
  exp: number
}

interface IFile {
  id: number | string
  path: string
  name: string
  url: string
  preview: string
}

interface IFetchManifestationsResult {
  count: number
  rows: IManifestation[]
  last_page: number
}

interface ISelectOption {
  label: string
  value: string | number
}
