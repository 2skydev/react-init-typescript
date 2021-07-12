// 해당 파일은 strapi 구조를 typescript로 내보내기 위한 설정 파일입니다

/**
 * @type {import('strapi-to-typescript')}
 */
const config = {
  /**
   * required
   */
  input: [
    'api',
    '../../node_modules/strapi-plugin-users-permissions/models/',
    '../../node_modules/strapi-plugin-upload/models/'
  ],
  // components: './components/',
  output: '../shared/src/types/strapi/',

  /**
   * optional
   */
  enum: true,
  nested: false,
  // excludeField: (interfaceName, fieldName) => fieldName === 'hide_field',
  addField: (interfaceName) => [{ name: "created_at", type: "string" }, { name: "updated_at", type: "string" }],

  /**
   * optional, builtin function used if undefined return
   */
  // fieldType: (fieldType, fieldName, interfaceName) => { if(fieldType == 'datetime') return 'string' },
  // fieldName: (fieldName) => fieldName.replace('_', ''),
  // interfaceName: (name) => `I${name}`,
  // enumName: (name, interfaceName) => `Enum${interfaceName}${name}`,
  // importAsType: (interfaceName) => interfaceName === 'MyInterfaceThatWantsToImportAsTypes' /* or just true */,
  // outputFileName: (interfaceName, filename) => interfaceName
}
module.exports = config;