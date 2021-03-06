import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { CgDollar } from 'react-icons/cg';

import { usePurchaseKeyMutation } from 'hooks/api/unlock';
import LockInfo from 'containers/lock-info';
import LockOwner from 'containers/lock-owner';

import Button from 'components/button';

import styles from './style.module.css';

const defaultValues = {
  lockAddress: '0xD0d33b9531dbD071B3baDDabe9fb289A60AC8cB8',
};

function LockPurchaseForm({ onSuccess, onError }) {
  const { register, watch, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const mutation = usePurchaseKeyMutation({
    config: {
      onSuccess: (data) => {
        onSuccess(data);
        reset();
      },
      onError: (data) => {
        onError(data);
      },
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values.address);
  };

  const address = watch('address');

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {mutation.isError ? (
          <div>An error occurred: {mutation.error.message}</div>
        ) : null}
        <label htmlFor="address">Address *</label>
        <input {...register('address')} />
        <Button
          className={styles.submit}
          type="submit"
          loading={mutation.isLoading}
        >
          {!mutation.isLoading ? <CgDollar /> : null}
          <span>Purchase</span>
        </Button>
      </form>
      {address && address !== '' ? (
        <div>
          <LockInfo lockAddress={address} />
          <LockOwner lockAddress={address} />
        </div>
      ) : null}
    </>
  );
}

LockPurchaseForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

LockPurchaseForm.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
};

export default LockPurchaseForm;
