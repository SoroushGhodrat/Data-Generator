import React, { useState } from 'react';
import ReactJson, { ThemeKeys, ThemeObject } from 'react-json-view';
import generateRandomData from '../helper/DataGenerator';
import '../App.css';

const DataList = () => {
  const [value, setValue] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(generateRandomData());
  const maxData: number = 200;

  const dataString = JSON.stringify(data, null, 4);
  const dataBlob = new Blob([dataString], { type: 'application/json' });
  const dataUrl = URL.createObjectURL(dataBlob);

  const themes: (ThemeKeys | ThemeObject)[] = [
    'apathy',
    'apathy:inverted',
    'ashes',
    'bespin',
    'brewer',
    'bright:inverted',
    'bright',
    'chalk',
    'codeschool',
    'colors',
    'eighties',
    'embers',
    'flat',
    'google',
    'grayscale',
    'grayscale:inverted',
    'greenscreen',
    'harmonic',
    'hopscotch',
    'isotope',
    'marrakesh',
    'mocha',
    'monokai',
    'ocean',
    'paraiso',
    'pop',
    'railscasts',
    'rjv-default',
    'shapeshifter',
    'shapeshifter:inverted',
    'solarized',
    'summerfruit',
    'summerfruit:inverted',
    'threezerotwofour',
    'tomorrow',
    'tube',
    'twilight',
  ];

  const jsonProperties: string[] = [
    '_id',
    'first_name',
    'last_name',
    'position',
    'isAvailable',
    'gender',
    'age',
    'image',
    'email',
    'office',
    'phone',
    'skills',
    'nationality',
    'description',
  ];

  const [selectedTheme, setSelectedTheme] = useState<ThemeKeys | ThemeObject>(
    'chalk'
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(dataString);
    alert('Data copied to clipboard');
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    const inputValue = Number(event.target.value);

    if (isNaN(Number(inputValue))) {
      setError('Please enter a number');
      setValue('');
      return;
    }

    setValue(inputValue);
  };

  const handleGenerateData = () => {
    const number = Number(value);

    if (!(number >= 1 && number <= maxData)) {
      setError(`Please enter a number between 1 and ${maxData}`);
      setValue('');
      return;
    }

    const newData = generateRandomData(Number(value));
    return setData(newData);
  };

  return (
    <div className="container">
      <header>
        <h2>Generate Fake Random Data</h2>
      </header>

      <section className="dataProperties">
        <h4>Data Properties</h4>
        <div>
          {jsonProperties.map((property) => (
            <span className="badge" key={property}>
              {property}
            </span>
          ))}
        </div>
      </section>

      <section className="data-generation-container">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <h4>you can generate data between 1 to {maxData}</h4>
        )}
        <div className="generate">
          <input
            type="text"
            placeholder="Enter a number"
            value={value}
            required
            onChange={handleNumberChange}
            style={{ borderColor: error ? 'red' : '' }}
          />
          <button onClick={handleGenerateData}>GENERATE</button>
        </div>
      </section>

      <section className="theme-data-container">
        <section className="themeSelector">
          <label htmlFor="theme">Choose Theme:</label>
          <select
            name="theme"
            id="theme"
            onChange={(e) =>
              setSelectedTheme(e.target.value as ThemeKeys | ThemeObject)
            }
          >
            {themes.map((theme, index) => (
              <option key={index} value={theme.toString()}>
                {theme.toString()}
              </option>
            ))}
          </select>
        </section>

        <section className="data">
          <ReactJson
            src={data}
            theme={selectedTheme}
            indentWidth={8}
            displayDataTypes={false}
            collapsed={false}
            style={{ padding: '20px', borderRadius: '5px' }}
          />
        </section>
        <section className="action-buttons">
          <a href={dataUrl} download="data.json">
            Download as a JSON File
          </a>
          <button onClick={handleCopy}>Copy Data</button>
        </section>
      </section>
    </div>
  );
};

export default DataList;
