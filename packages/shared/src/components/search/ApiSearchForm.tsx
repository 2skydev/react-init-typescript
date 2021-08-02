import React from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Row, Col, Form, Divider, Button } from 'antd';
import qs from 'qs';
import styled from 'styled-components';

import kr from '@web/shared/locale/kr';

import models from '@web/shared/types/strapi/models.json';

import BooleanSearchField from './BooleanSearchField';
import ElumSearchField from './ElumSearchField';
import NumberSearchField from './NumberSearchField';
import TextSearchField from './TextSearchField';

interface IProps {
  name: string;
  excludes?: string[];
  onSearchFinish: (
    queryString: string,
    queryObject: Record<string, any>,
  ) => void;
}

interface IField {
  textSearchField: string[];
  numberSearchField: string[];
  booleanSearchField: string[];
  elumSearchField: {
    label: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  timeSearchField: string[];
  dateSearchField: string[];
  relationSearchField: string[];
}

const FormWrapper = styled.div`
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #ededed;
  .gutter-row {
    padding: 0.5rem 0;
  }
  .ant-form-item-label {
    text-align: left;
  }
  .buttonWrapper {
    display: flex;
    justify-content: flex-end;
  }
`;

export default function ApiSearchForm({
  name,
  excludes,
  onSearchFinish,
}: IProps) {
  const model = models.find(_model => _model.info.name === name);
  if (!model) {
    return <>undefined name!!</>;
  }

  const searchField = Object.entries(model.attributes).reduce(
    (acc: IField, [key, value]) => {
      if (excludes && excludes.includes(key)) {
        return acc;
      }

      if (value.type) {
        switch (value.type) {
          case 'time':
            acc.timeSearchField.push(key);
            break;
          case 'date':
          case 'datetime':
            acc.dateSearchField.push(key);
            break;
          case 'boolean':
            acc.booleanSearchField.push(key);
            break;
          case 'enumeration':
            acc.elumSearchField.push({
              label: key,
              options: value.enum.map((val: string) => ({
                label: kr[`${name}.enum.${key}.${val}`] || val,
                value: val,
              })),
            });
            break;
          case 'richtext':
          case 'password':
            break;
          case 'integer':
          case 'biginteger':
          case 'decimal':
          case 'float':
            acc.numberSearchField.push(key);
            break;
          default:
            acc.textSearchField.push(key);
        }
      }

      if (value.model) {
        acc.relationSearchField.push(key);
      }

      return acc;
    },
    {
      textSearchField: [],
      timeSearchField: [],
      dateSearchField: [],
      relationSearchField: [],
      booleanSearchField: [],
      elumSearchField: [],
      numberSearchField: [],
    },
  );

  return (
    <FormWrapper>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{
          keyword: {
            field: '',
          },
        }}
        onFinish={(values: any) => {
          const flatFormValue = Object.keys(values).reduce(
            (acc: any[], key) => {
              if (key === 'keyword') {
                return [
                  ...acc,
                  values[key]['field'] && values[key]['value']
                    ? true
                    : undefined,
                ];
              } else if (searchField.numberSearchField.includes(key)) {
                return [
                  ...acc,
                  values[key]['min'] || values[key]['max'] ? true : undefined,
                ];
              } else {
                return [
                  ...acc,
                  (Array.isArray(values[key]) && values[key].length) ||
                  (!Array.isArray(values[key]) && values[key])
                    ? true
                    : undefined,
                ];
              }
            },
            [],
          );
          const isSearch = flatFormValue.some(val => Boolean(val));

          if (!isSearch) {
            onSearchFinish('', {});
            return false;
          }

          const queryObject = Object.keys(searchField).reduce(
            (acc: Record<string, any>, key) => {
              if (
                key === 'textSearchField' &&
                values.keyword.field &&
                values.keyword.value
              ) {
                acc[`${values.keyword.field}_contains`] = values.keyword.value;
              } else if (key === 'numberSearchField') {
                searchField.numberSearchField.forEach(field => {
                  if (values[field].min) {
                    acc[`${field}_gte`] = values[field].min;
                  }

                  if (values[field].max) {
                    acc[`${field}_lte`] = values[field].max;
                  }
                });
              } else if (key === 'elumSearchField') {
                searchField.elumSearchField.forEach(field => {
                  if (
                    Array.isArray(values[field.label]) &&
                    values[field.label].length > 0
                  ) {
                    acc[`${field.label}_in`] = values[field.label];
                  }
                });
              } else if (key === 'booleanSearchField') {
                searchField.booleanSearchField.forEach(field => {
                  if (values[field] !== undefined) {
                    acc[field] = values[field];
                  }
                });
              }
              return acc;
            },
            {},
          );

          onSearchFinish(qs.stringify(queryObject), queryObject);
        }}
      >
        <Form.Item label="키워드">
          <TextSearchField
            fields={searchField.textSearchField.map(field => ({
              label: kr[`${name}.field.${field}`] || field,
              value: field,
            }))}
          />
        </Form.Item>

        {Boolean(searchField.textSearchField.length) && <Divider />}

        {searchField.numberSearchField.map(field => (
          <Form.Item key={field} label={kr[`${name}.field.${field}`] || field}>
            <NumberSearchField name={field} />
          </Form.Item>
        ))}

        {Boolean(searchField.numberSearchField.length) && <Divider />}

        {searchField.elumSearchField.map(field => (
          <Form.Item
            key={field.label}
            label={kr[`${name}.field.${field.label}`] || field.label}
          >
            <ElumSearchField label={field.label} options={field.options} />
          </Form.Item>
        ))}

        {Boolean(searchField.elumSearchField.length) && <Divider />}

        <Row gutter={16}>
          {searchField.booleanSearchField.map(field => (
            <Col className="gutter-row" span={3} key={field}>
              <BooleanSearchField
                label={kr[`${name}.field.${field}`] || field}
                name={field}
              />
            </Col>
          ))}
        </Row>
        <div className="buttonWrapper">
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            검색
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
}
