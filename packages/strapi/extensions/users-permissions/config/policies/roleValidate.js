const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

// 관리자 권한이 필요한 역할 타입들
const NEED_ADMIN_ROLE_TYPES = ['admin']

// 관리자 역할 타입
const ADMIN_ROLE_TYPE = 'admin'


module.exports = async (ctx, next) => {
  const user = ctx.state.user
  const params = ctx.request.body


  // 역할 할당이 없다면 바로 넘기기
  if (params.role === undefined) {
    return await next()
  }


  // 모든 역할들
  const roles = await strapi
    .query('role', 'users-permissions')
    .find({}, []);


  // 기본 역할 가져오기
  const pluginStore = await strapi.store({
    environment: '',
    type: 'plugin',
    name: 'users-permissions',
  });

  const settings = await pluginStore.get({
    key: 'advanced',
  });

  const defaultRole = roles.find(role => role.type === settings.default_role)

  if (!defaultRole) {
    return ctx.badRequest(
      null,
      formatError({
        id: 'Auth.form.error.role.notFound',
        message: 'Impossible to find the default role.',
      })
    );
  }
  

  // 현재 할당 하려는 역할이 관리자 권한을 필요 하는지 확인
  const isNeedAdmin = roles.filter(role => NEED_ADMIN_ROLE_TYPES.includes(role.type)).some(role => 
    String(params.role) === role.type ||
    Number(params.role) === role.id
  )
  
  // 관리자인지 아닌지 확인
  if (isNeedAdmin && user.role.type !== ADMIN_ROLE_TYPE) {
    return ctx.unauthorized('관리자만 할당할 수 있는 역할입니다.');
  }
  

  // params.role이 숫자가 아니고 기본 역할이 아닐경우
  if (isNaN(Number(params.role)) && params.role !== defaultRole.type) {

    // 할당 하려는 역할 찾기
    const customRole = roles.find(role => role.type === params.role)

    if (!customRole) {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Auth.form.error.role.notFoundCustomRole',
          message: '할당 하려는 역할을 찾을 수 없습니다.',
        })
      );
    }

    params.role = customRole.id
  } else if (isNaN(Number(params.role))) {
    // params.role이 숫자가 아닐경우 기본 역할 할당
    params.role = defaultRole.id
  }

  console.log(ctx.request.body.role)

  return await next()
};
