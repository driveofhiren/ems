import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import EmployeeTable from './components/EmployeeTable';
import EmployeeCreate from './components/EmployeeCreate';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboards from './Dashboard/Dashboards';
import EmployeeEdit from './components/EmployeeEdit';

export const client = new ApolloClient({
  uri: 'http://localhost:4000 ',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <BrowserRouter>
     <Routes >

      <Route path="/" element={ <Dashboards Child={<EmployeeTable/>} />}></Route>
      <Route path="/create" element={ <Dashboards Child={<EmployeeCreate/>} />}></Route>
      <Route path="/edit/:SearchName" element={ <Dashboards Child={<EmployeeEdit/>} />}></Route>
      

    </Routes>
    </BrowserRouter>
  );
}

export default App;
