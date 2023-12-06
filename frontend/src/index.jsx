import { createRoot } from 'react-dom/client';

import App from './components/app/app';

const container = document.getElementById('root');
// @ts-ignore
const root = createRoot(container);

root.render(<App />);
