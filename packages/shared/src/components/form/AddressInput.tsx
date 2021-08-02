import React from 'react';
import DaumPostcode from 'react-daum-postcode';

import { FormikContext } from 'formik';
import styled from 'styled-components';

import Icon from '../icon/Icon';
import Input, { InputTypes } from './Input';

const Overlay = styled.div<{
  visible: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);

  .daumPostcodeWrap {
    position: relative;
    max-width: 600px;
    width: 100%;

    .closeBtn {
      position: absolute;
      left: 100%;
      top: 0;
      width: 3rem;
      height: 3rem;
      border: none;
      background: #4563e9;
      color: #fff;
      line-height: 1em;
    }
  }

  ${props =>
    !props.visible &&
    `
        display: none;
    `}
`;

interface IAddressInput {
  addressInputProps: InputTypes;
  addressDetailInputProps: InputTypes;
  enableDetailInput?: boolean;
}

export default function AddressInput({
  addressInputProps,
  addressDetailInputProps,
  enableDetailInput = true,
}: IAddressInput) {
  const formik = React.useContext(FormikContext);
  const [openPostcode, setOpenPostcode] = React.useState(false);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    formik.setFieldValue(addressInputProps.name, fullAddress);
    setOpenPostcode(false);
  };

  return (
    <>
      <Input
        {...{
          readOnly: true,
          onFocus: e => {
            if (typeof addressInputProps.onFocus === 'function') {
              addressInputProps.onFocus(e);
            }
            setOpenPostcode(true);
          },
          ...addressInputProps,
        }}
      />
      {enableDetailInput && <Input {...addressDetailInputProps} />}
      <Overlay visible={openPostcode}>
        <div className="daumPostcodeWrap">
          <button
            className="closeBtn"
            type="button"
            onClick={() => {
              setOpenPostcode(false);
            }}
          >
            <Icon icon="close" />
          </button>
          <DaumPostcode onComplete={handleComplete} />
        </div>
      </Overlay>
    </>
  );
}
