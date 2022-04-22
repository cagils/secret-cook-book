import styles from './BaseTemplate.module.css';

const BaseTemplate = ({ sampleTextProp }) => {
  return <div className={styles.container}>{sampleTextProp}</div>;
};

export default BaseTemplate;
