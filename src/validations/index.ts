import {
  boolean,
  object,
  string,
  number,
  array,
  ref,
  lazy,
  StringSchema,
} from "yup"

export const createManifestationSchema = object().shape({
  title: string().required("O título é necessário"),
  description: string()
    .max(900, "É permitido apenas 900 caracteres na descrição")
    .required("A descrição é necessária"),
  // apenas o id
  categories: array()
    .of(object().shape({ value: number(), label: string() }))
    .required("A categoria é necessária")
    .nullable(),
  type: object()
    .shape({ value: number(), label: string() })
    .required("O tipo é necessário")
    .nullable(),
  location: string(),
  files_id: number(),
})

export const loginSchema = object().shape({
  email: string()
    .email("Insira um email válido.")
    .required("O email é necessário"),
  password: string().required("A senha é necessária"),
})

export const sendMailSchema = object().shape({
  title: string()
    .max(145, "No máximo 145 caracteres")
    .required("Um título é necessário"),
  text: string().required("O conteudo do email é necessário"),
})

export const settingsSchema = object().shape({
  title: string().required("O titulo é necessário"),
  email: string()
    .email("Insira um email válido")
    .when("$email", (checkIfEmail: string, passSchema: StringSchema) =>
      checkIfEmail ? passSchema.required("O email é necessário") : passSchema
    ),
})

export const searchByProtocolSchema = object().shape({
  protocol: string().required("O protocolo é necessário"),
})

export const searchManifestationsSchema = object().shape({
  text: string(),
  selections: array()
    .of(
      object().shape({
        label: string().required(),
        value: lazy((value) =>
          typeof value === "number" ? number().required() : string().required()
        ),
      })
    )
    .nullable(),
})

export const createUserSchema = object().shape({
  first_name: string().required("O primeiro nome é necessário"),
  last_name: string().required("O sobrenome é necessário"),
  email: string()
    .email("Insira um email válido.")
    .required("O email é necessário"),
  password: string().required("A senha é necessária"),
  confirmPassword: string()
    .oneOf([ref("password")], "A confirmação da senha não é igual a senha")
    .required("É necessário confirmar a senha"),
  isAdmin: boolean(),
})

export const createOmbudsmanSchema = object().shape({
  site: string().required("O site é necessário"),
  location: string().required("A localização é necessária"),
  email: string()
    .email("Insira um email válido.")
    .required("O email é necessário"),
  telephone: string().required("O telefone é necessário"),
  attendance: string().required("O horário de atendimento é necessário"),
})

export const editOmbudsmanSchema = object().shape({
  site: string(),
  location: string(),
  email: string().email("Insira um email válido."),
  telephone: string(),
  attendance: string(),
})

export const createPrefectureSchema = object().shape({
  name: string().required("O nome da cidade é necessário"),
  site: string().required("O site é necessário"),
  location: string().required("A localização é necessária"),
  email: string()
    .email("Insira um email válido.")
    .required("O email é necessário"),
  telephone: string().required("O telefone é necessário"),
  attendance: string().required("O horário de atendimento é necessário"),
  ombudsmanEmail: string().required("O email da ouvidoria é necessário"),
})

export const editPrefectureSchema = object().shape({
  name: string(),
  site: string(),
  location: string(),
  email: string().email("Insira um email válido."),
  telephone: string(),
  attendance: string(),
  ombudsmanEmail: string(),
})
