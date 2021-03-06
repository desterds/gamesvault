import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { CgDatabase } from 'react-icons/cg';

import {
  useCreateCollectionMutation,
  useInvalidateCollectionsQuery,
} from 'hooks/api/db';

import Button from 'components/button';

import styles from './style.module.css';

const defaultValues = {
  name: '',
};

function CollectionCreateForm({ threadId, onSuccess, onError }) {
  const invalidate = useInvalidateCollectionsQuery({ threadId });
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const mutation = useCreateCollectionMutation({
    threadId,
    config: {
      onSuccess: (data) => {
        onSuccess(data);
        invalidate();
        reset();
      },
      onError: (data) => {
        onError(data);
      },
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values.name);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {mutation.isError ? (
        <div>An error occurred: {mutation.error.message}</div>
      ) : null}
      <label htmlFor="name">Name *</label>
      <input {...register('name')} />
      <Button
        className={styles.submit}
        type="submit"
        loading={mutation.isLoading}
      >
        {!mutation.isLoading ? <CgDatabase /> : null}
        <span>Create</span>
      </Button>
    </form>
  );
}

CollectionCreateForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  threadId: PropTypes.string.isRequired,
};

CollectionCreateForm.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
};

export default CollectionCreateForm;
