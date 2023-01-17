import styles from './App.module.scss';
import CalendarContainer from './components/CalendarContainer/CalendarContainer';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <CalendarContainer />
    </div>
  );
};

export default App;
