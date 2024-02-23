import './App.css';
import CsvUploader from './components/CsvUploader.jsx';
import DataGrid from './components/DataGrid.jsx';
import { useState } from 'react';
import Container from './components/Container.jsx';

function App() {
    // Employees grouped by project id
    const [groupedByProject, setGroupedByProject] = useState({});
    const hasData = Object.keys(groupedByProject).length !== 0;

    return (
        <div className="App-body">
            <Container title="Ranking: check out the employees who've worked together the longest">
                {hasData && <DataGrid groupedByProject={groupedByProject} />}
                <CsvUploader controlGroupByProject={setGroupedByProject} />
            </Container>
        </div>
    );
}

export default App;
