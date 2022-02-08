import './App.css';
import MainLayout from "./hoc/mainLayout/mainLayout";
import ButtonBlock from "./Components/MainButtonsGroup/ButtonBlock/ButtonBlock";
import {Route, Routes} from "react-router-dom";
import CarsList from "./Components/CarInfoPage/CarsList/CarsList";
import EmployeeCard from "./Components/EmployeesPage/EmployeeCard/EmployeeCard";
import EmployeesList from "./Components/EmployeesPage/EmployeesList/EmployeesList";
import PreAuthorizationPage from "./Components/SettingsPageGroup/PreAutorizationPage/PreAutorizationPage";
import SelectTable from "./Components/SettingsPageGroup/SettingsPage/SelectComponents/SelectTable/SelectTable";
import SelectOperation
    from "./Components/SettingsPageGroup/SettingsPage/SelectComponents/SelectOperation/SelectOperation";
import SettingsPage from "./Components/SettingsPageGroup/SettingsPage/SettingsPage";
import CarInfoElement
    from "./Components/SettingsPageGroup/SettingsPage/SelectedTableControls/CarInformationTableControls/CarInfoElement/CarInfoElement";
import CarInfoElementExtended
    from "./Components/SettingsPageGroup/SettingsPage/SelectedTableControls/CarInformationTableControls/CarInfoElement/CarInfoElementExtended";


function App() {
    const application = ( <MainLayout>

        <ButtonBlock/>
    </MainLayout>
    )
  return (
<div>
    <Routes>
        <Route path='/' element={application}/>
        <Route path='/car' exact element={(
            <MainLayout>
                <CarsList/>
            </MainLayout>
        )} />
        <Route path='/employees' exact element={(
            <MainLayout>
                <EmployeesList/>
            </MainLayout>
        )} />
        <Route path='/settings'  element={(
            <MainLayout>
                <SettingsPage/>
            </MainLayout>
        )} />
    </Routes>

</div>


  );
}

export default App;
