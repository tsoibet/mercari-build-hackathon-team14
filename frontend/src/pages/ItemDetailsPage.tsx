import Header from "../components/Header/index";
import React, { useEffect, useState } from 'react';

// interface Item {
//     id: number;
//     name: string;
//     category: string;
//     image_filename: string;
// };

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
    reload?: boolean;
    onLoadCompleted?: () => void;
    item_id: string
}

export const ItemDetail: React.FC<Prop> = (props) => {
    const { reload = true, onLoadCompleted } = props;
    const item_id = props.item_id
    const [item, setItem] = useState({
        "id": 0,
        "name": "tmp",
        "category": "tmp",
        "image_filename": "tmp.jpg",
        "user_id": 0,
        "isImage": true
    })
    const fetchItem = () => {
        fetch(server.concat(`/items/${item_id}`),
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('GET success:', data);
                if (data.image_filename.includes(".jpg")) { data.isImage = true }
                else (data.isImage = false)
                setItem(data);
                onLoadCompleted && onLoadCompleted();
            })
            .catch(error => {
                console.error('GET error:', error)
            })
    }

    useEffect(() => {
        if (reload) {
            fetchItem();
        }
    }, [reload]);

    // <img src={server + "/image/" + item.image_filename} alt="" className='ItemDetailsImg' />
    return (
        <div className='Body'>
            <Header></Header>
            <div key={item.id} className='ItemList'>
                {item.isImage ?
                    <img src={server + "/image/" + item.image_filename} alt="" className='ItemDetailsImg' />
                    :
                    <div className="ItemImage">
                        <video controls muted height="140">
                            <source src={server + "/image/" + item.image_filename} type="video/mp4"></source>
                        </video>
                    </div>
                }
                <p>
                    <span>Name: {item.name}</span>
                    <br />
                    <span>Category: {item.category}</span>
                    <br />
                    <span>Description: {item.category}</span>
                </p>
            </div>
        </div>
    )
};

