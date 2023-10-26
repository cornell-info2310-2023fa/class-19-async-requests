import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

import AlertPanel from './components/AlertPanel';
import DarkModeSwitcher from './components/DarkModeSwitcher';
import AccordionPanel from './components/AccordionPanel';

export default function App() {

  const [alert, setAlert] = useState("test alert");
  useEffect(() => {
    console.log("ready to request alert data");
  }, []);

  const [panelActiveIndex, setPanelActiveIndex] = useState(-1);
  const [appearance, setAppearance] = useState({
    isDarkMode: false,
    fontSize: '120%'
  });

  const [reactDocs, setReactDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios.get('/api/docs.json')
      .then((response) => {
        const json = response.data;

        setReactDocs(json);
        setPanelActiveIndex(json[0].id);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: (appearance.isDarkMode ? 'black' : 'white'),
        color: (appearance.isDarkMode ? 'white' : 'black'),
        fontSize: appearance.fontSize
      }}>

      {alert && (
        <AlertPanel>
          {alert}
        </AlertPanel>
      )}

      <DarkModeSwitcher onSwitchDarkMode={(mode) => setAppearance(
        {
          ...appearance,
          isDarkMode: mode
        }
      )} />

      <main>
        {error && (
          <div className="error">
            <p>{`There is a problem fetching the documentation. (${error})`}</p>
            <button>Retry</button>
          </div>
        )}

        {isLoading && (<div>Loading...</div>)}

        {!isLoading && !error && reactDocs.map(doc => (
          <AccordionPanel
            key={doc.id}
            title={doc.title}
            isExpanded={panelActiveIndex === doc.id}
            onActivate={() => {
              setPanelActiveIndex(doc.id);
            }}
            darkMode={appearance.isDarkMode}
          >
            {doc.body}
          </AccordionPanel>
        ))}
      </main>
    </div>
  );
}
