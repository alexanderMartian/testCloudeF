import {Field, useField} from 'formik';
import styles from './CustomField.module.scss';

const CustomField = (props) => {
  const [field, meta] = useField(props);
  const {label, type, elementType} = props;
  const isError = meta.error && meta.touched;

  return (
    <div className={label === 'description' ? styles.customTextArea : styles.customField}>
      <span className={styles.label}>{field.value ? label : '\u00A0'}</span>
      <Field
        {...field}
        className={isError ? styles.err : undefined}
        placeholder={label}
        label={label}
        type={type}
        as={elementType}
      />
      <span className={styles.errLabel}>{isError ? meta.error : '\u00A0'}</span>
    </div>
  );
};

export default CustomField;
