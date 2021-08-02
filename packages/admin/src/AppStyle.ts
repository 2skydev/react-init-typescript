import styled from 'styled-components';

import './app.css';

export const AppStyle = styled.div`
  .ant-modal-mask {
    background-color: rgba(black, 0.2);
    backdrop-filter: saturate(180%) blur(5px);
  }

  .ant-table-thead > tr > th {
    /* background: none; */
  }

  .ant-btn-primary {
    border-color: #4563e9;
    background: #4563e9;
  }

  .ant-table-cell-fix-right,
  .ant-table-cell-fix-left {
    /* background: white !important; */
  }

  .ant-radio-group .helperText {
    font-size: 12px;
  }
`;
