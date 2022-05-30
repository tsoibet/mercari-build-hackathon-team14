import { useState } from 'react';
import { ItemList } from '../../components/ItemList';
import Header from '../../components/Header';
import "./style.scss";



function HomePage() {
    const [reload, setReload] = useState(true);
    return (
        <div>
            <Header></Header>
            <div>
                <ItemList reload={reload} onLoadCompleted={() => setReload(false)} />
            </div>
        </div>
    );
}

export default HomePage;