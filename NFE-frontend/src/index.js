import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './redux/store';


import App from './App';


ReactDOM.render(

<React.StrictMode>
<DataProvider>
    <App />
    </DataProvider>
</React.StrictMode>,
    document.getElementById('root')
    );




