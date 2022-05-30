import { useState } from 'react';
import { ItemList } from '../components/ItemList';
import Header from '../components/Header';

function HomePage() {
    // reload ItemList after Listing complete
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