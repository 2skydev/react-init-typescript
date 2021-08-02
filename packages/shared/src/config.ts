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
    host: null,
    prefix: null,
  },
};

// 개발 환경 설정
export const dev: ConfigRoot = {
  api: {
    host: 'http://localhost:4000',
    prefix: '',
  },
};
