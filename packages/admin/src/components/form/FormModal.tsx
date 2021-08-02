import React from 'react';
import { ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import qs from 'qs';
import styled from 'styled-components';

/* import { delay } from '@web/shared/utils'; */
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';

const FormModalStyle = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 58px;

  .content {
    padding: 2rem;

    .contentRap {
      max-width: 1024px;
      margin: 0 auto;
    }
  }
`;

interface Props {
  modalID: string;
  breadcrumb: string[];
  title: string;
  onSubmit?: () => void;
  onReset?: () => void;
  children?: ReactNode;
  hasRequired?: boolean;
  defaultOpen?: boolean;
  closePath?: string;
  contentSize?: 'full' | 'medium' | 'small';
  onSave?: () => void;
}

const ContetnBox = styled.div`
  .headerRap {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
  }
`;

export default function FormModal({
  modalID,
  breadcrumb,
  title,
  onSubmit,
  onReset,
  children,
  hasRequired,
  defaultOpen,
  closePath,
  contentSize = 'small',
  onSave,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
    /* history.push(`${closePath || location.pathname}`); */
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await onSubmit?.();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      window.document.body.style.overflow = 'hidden';
    } else {
      onReset?.();
      window.document.body.style.overflow = 'auto';
    }
  }, [open]);

  React.useEffect(() => {
    if (defaultOpen) {
      setOpen(true);
      return;
    }

    if (location.search) {
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      if (query.formModal === modalID) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  }, [location]);

  const contentClass = {
    full: 'headerRap',
    small: 'contentRap',
    medium: 'contentRap',
  }[contentSize];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 10,
            height: 'calc(100vh - 64px)',
            width: '100vw',
            backgroundColor: 'white',
          }}
          initial={{ transform: 'translateY(10px)', opacity: 0 }}
          animate={{ transform: 'translateY(0px)', opacity: 1 }}
          exit={{ transform: 'translateY(10px)', opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FormModalStyle>
            <FormHeader
              breadcrumb={breadcrumb}
              title={title}
              hasRequired={hasRequired}
              onClose={handleClose}
            />

            <ContetnBox className="content">
              <div className={contentClass}>{children}</div>
            </ContetnBox>

            <FormFooter
              onBack={handleClose}
              onSave={onSave ? onSave : handleSubmit}
              saveButtonLoading={loading}
              isFixed
            />
          </FormModalStyle>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
