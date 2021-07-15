interface APIConfig {
  host: string | null;
  prefix: string | null;
}

interface ConfigRoot {
  api: APIConfig;
}

// 프로덕션 환경 설정
export const pro: ConfigRoot = {
  api: {
    host: 'http://192.168.0.64:1337',
    prefix: '',
  },
};

// 개발 환경 설정
export const dev: ConfigRoot = {
  api: {
    host: 'http://192.168.0.64:1337',
    prefix: '',
  },
};
