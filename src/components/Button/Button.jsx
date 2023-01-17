import styles from './Button.module.scss';

function Button(props) {
  const {children, type} = props;
  return (
    <button className={styles.btn} {...props} type={type}>
      {children}
    </button>
  );
}

export default Button;
