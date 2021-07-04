export class Schema {
  static isValid(schema: any, value: any): boolean {
    return schema.validate(value).error === undefined
  }

  static get inputFileItemOptional(): any {
    return {}
    // return Joi.object({
    //   data: Joi.string().base64().allow(''),
    //   id: Joi.string().allow(''),
    //   name: Joi.string().allow('')
    // })
  }

  static get inputFileItemRequired(): any {
    return {}
    // return Joi.object({
    //   data: Joi.string().base64().required(),
    //   id: Joi.string().required(),
    //   name: Joi.string().required()
    // })
  }
}
