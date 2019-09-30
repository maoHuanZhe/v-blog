module.exports = {
  title: 'v-Blog Admin',

  /**
   * @type {boolean} true | false
   * @description 是否在右面板显示设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要标签栏
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否修复标题
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在边栏中显示徽标
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示错误日志组件。
   * 默认仅在生产环境中使用
   * 如果您还想在开发人员中使用它，可以通过 ['production', 'development']
   */
  errorLog: ['production', 'development']
}
