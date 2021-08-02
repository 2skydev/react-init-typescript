import React, { useState } from 'react';

import { AutoComplete } from 'antd';
import { FormikContext } from 'formik';
import _ from 'lodash';
import styled from 'styled-components';

import { useGet } from '@web/shared/apis';
import { IAnyObject } from '@web/shared/types/etc';
import { TCollection } from '@web/shared/types/strapi/collection';

import FormField from './FormField';

interface ITableSelect {
  table: TCollection;
  searchField: string;
  queryString?: any;
  name: string;
  label?: string;
  helperText?: string;
  placeHolder?: string;
}

const Div = styled.div`
  .ant-select-selector {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 4px !important;
    padding-left: 4% !important;
  }

  .error .ant-select-selector {
    border-color: red !important;
  }
`;

export default function TableSelect({
  table,
  searchField,
  queryString: initQueryString,
  label,
  helperText,
  name,
  placeHolder,
}: ITableSelect) {
  const formik = React.useContext(FormikContext);
  const [inputValue, setInputValue] = React.useState(
    formik.values[name][searchField],
  );
  const error = formik.errors[name];

  const [queryString, setQueryString] = useState({
    ...initQueryString,
    _limit: 5,
  });
  const { data } = useGet(`${table}`, {
    qs: queryString,
  });
  const options = React.useMemo(() => {
    return (data || []).map((x: any) => ({
      value: x[searchField],
    }));
  }, [data, searchField]);

  const delayedQueryCall = React.useCallback<any>(
    _.debounce(q => {
      setQueryString((queryString: any) => ({
        ...queryString,
        [`${searchField}_contains`]: q,
      }));
    }, 500),
    [],
  );

  const onSearch = async (searchText: string) => {
    setInputValue(searchText);
    delayedQueryCall(searchText);
  };
  const onSelect = (selectId: string) => {
    const selectedData = data.find((x: any) => x[searchField] === selectId);
    formik.setFieldValue(name, selectedData);
    setInputValue(selectedData[searchField]);
  };

  React.useEffect(() => {
    setInputValue(formik.values[name][searchField]);
  }, [formik.values[name][searchField]]);

  return (
    <Div>
      <FormField
        label={label}
        error={error ? helperText || (error as string) : ''}
      >
        <AutoComplete
          options={options || []}
          style={{ width: 200 }}
          onSelect={onSelect}
          onSearch={onSearch}
          value={inputValue}
          placeholder={placeHolder || '검색어를 입력해주세요.'}
        />
      </FormField>
    </Div>
  );
}
