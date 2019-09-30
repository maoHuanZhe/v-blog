const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  permission_routes: state => state.permission.routes,
  avatar: state => state.user.avatar,
  device: state => state.app.device,
  errorLogs: state => state.errorLog.logs,
  roles: state => state.user.roles,
  name: state => state.user.name,
  token: state => state.user.token,
}
export default getters
