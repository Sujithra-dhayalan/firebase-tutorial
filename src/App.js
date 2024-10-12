import './App.css';
import Auth from './components/auth';
import Crud from './components/CrudOperations';
import Storage from './components/Storage';
function App() {
  return (
    <div className="App">
      <Auth />
      <Crud />
      <Storage />
    </div>
  );
}

export default App;
