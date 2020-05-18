// Add support for svg imports
declare module "*.svg" {
  const content: unknown
  export default content
}
// Variaveis de ambiente
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_URL: string
    REACT_APP_GOOGLE_MAPS_KEY: string
    REACT_APP_GOOGLE_MAPS_ACCESS_TOKEN: string
    REACT_APP_GOOGLE_MAPS_LATITUDE: string
    REACT_APP_GOOGLE_MAPS_LONGITUDE: string
    REACT_APP_GOOGLE_MAPS_ZOOM: string
    REACT_APP_CITY: string
  }
}

/**
 * Interfaces importantes para as regras de negócio
 */

interface ICategory {
  id: number
  title: string
}

interface IType {
  id: number
  title: string
}

interface IManifestation {
  id: number
  protocol: string
  title: string
  description: string
  read: number
  location: string
  latitude: string
  longitude: string
  created_at: string
  updated_at: string
  ombudsmen_id: number
  categories: ICategory[]
  type: IType
  user: IProfile
  secretary: ISecretary
  files: IFile[]
  status_history: IManifestationStatus[]
}

interface IManifestationStatus {
  id: number
  description: string
  created_at: string
  updated_at: string
  status: IStatus
}

interface IPrefecture {
  id: number
  name: string
  ombudsman: IOmbudsman
  location: string
  telephone: string
  email: string
  attendance: string
  site: string
  created_at: string
  updated_at: string
}

interface IOmbudsman {
  id: number
  location: string
  telephone: string
  email: string
  site: string
  attendance: string
  created_at: string
  updated_at: string
}

interface IRole {
  id: number
  title: "master" | "admin" | "citizen"
}

interface IStatus {
  title: string
  id: number
}

interface ISecretary {
  id: number
  title: string
  email: string
  accountable: string
  prefectures_id: number
}

interface IMailReturn {
  message: string
}

interface IProfile {
  id: number
  first_name: string
  last_name: string
  email: string
  role: "master" | "admin" | "citizen"
}

interface IGenericItem {
  id: number
  title: string
}

interface IToken {
  id: number
  city: string
  role: IRole
  iat: number
  exp: number
}

interface IFile {
  id: number
  extension: string
  name: string
  name_in_server: string
  created_at: string
  updated_at: string
  users_id: number
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
