import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "@/styles/reset.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
        <App />
);