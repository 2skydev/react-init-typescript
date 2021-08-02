import { useHistory, useLocation } from 'react-router-dom';

import { notification } from 'antd';
import QueryString from 'qs';

import { IAnyObject } from '@web/shared/types/etc';

interface ICloseOptions {
  closePath?: string;
  message?: React.ReactNode;
  description?: React.ReactNode;
}

export default function useFormModal() {
  const location = useLocation();
  const history = useHistory();

  const open = (modalID: string, params: IAnyObject = {}) => {
    const qsParmas = QueryString.stringify(params);
    history.push(
      `${location.pathname}?formModal=${modalID}${
        qsParmas ? `&${qsParmas}` : ''
      }`,
    );
  };

  const close = (options: ICloseOptions) => {
    if (options.message) {
      notification.success({
        message: options.message,
        description: options.description,
      });
    }

    history.push(options.closePath || location.pathname);
  };

  return { open, close };
}
