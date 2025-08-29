import React from 'react';
import "./App.scss"
import {TimelineBlock} from "@/components/TimelineBlock";
import {segments} from "@/data";

const App = () => {
    return (
        <div className="app">
            <TimelineBlock data={segments} />
        </div>
    );
};

export default App;