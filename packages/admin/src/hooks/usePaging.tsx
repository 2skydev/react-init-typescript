import React from 'react';

import { PaginationProps } from 'antd/lib/pagination';
import _ from 'lodash';

import { useGetAPI } from '@web/shared/apis';
import { IUseGetReturn } from '@web/shared/types/apis';
import { TCollection } from '@web/shared/types/strapi/collection';

interface IUsePagingOptions {
  table: TCollection;
  qs?: Record<string, unknown>;
  paginationProps?: PaginationProps;
}

interface usePagingReturnValue extends IUseGetReturn {
  pagination: PaginationProps;
}

// 기본 값 세팅
const defaultPagesizeOptions = ['10', '20', '50', '100'];
const defaultPageSize = Number(defaultPagesizeOptions[0]);
const defaultCurrent = 1;

export default function usePaging({
  table,
  qs: _qs,
  paginationProps,
}: IUsePagingOptions): usePagingReturnValue {
  const [page, setPage] = React.useState([defaultCurrent, defaultPageSize]);
  const [prevData, setPrevData] = React.useState([]);

  // query string 세팅
  const qs = _qs || {};
  qs._limit = page[1];
  qs._start = page[1] * (page[0] - 1);

  // total count request
  const {
    data: total = 0,
    isLoading: totalLoading,
    isFetching: totalFetching,
  } = useGetAPI(table, {
    qs: _.omit(qs, ['_limit', '_start']),
    count: true,
  });

  // data request
  const {
    data = [],
    isLoading: dataLoading,
    isFetching: dataFetching,
    ...state
  } = useGetAPI(table, {
    qs,
    enabled: Boolean(total),
  });

  // 페이징 버튼 누를 시 호출
  const handleChangePage = (page: number, pageSize: number | undefined) => {
    setPage([page, pageSize as number]);
  };

  React.useEffect(() => {
    if (data.length) {
      setPrevData(data);
    }
  }, [data, dataFetching]);

  return {
    data: dataFetching && !data.length ? prevData : data,
    ...state,
    isLoading: totalLoading || dataLoading,
    isFetching: totalFetching || dataFetching,
    pagination: {
      total,
      onChange: handleChangePage,
      current: page[0],
      pageSize: page[1],
      pageSizeOptions: defaultPagesizeOptions,
      ...paginationProps,
    },
  };
}
