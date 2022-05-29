import Header from "../components/Header/index";
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
    reload?: boolean;
    onLoadCompleted?: () => void;
    // item_id: string
}

const ItemDetail: React.FC<Prop> = (props) => {
    const { reload = true, onLoadCompleted } = props;
    const { itemId } = useParams()
    console.log(itemId)
    const [item, setItem] = useState({
        "id": 0,
        "name": "tmp",
        "category": "tmp",
        "image_filename": "tmp.jpg",
        "user_id": 0,
        "isImage": true
    })
    const fetchItem = useCallback(() => {
        fetch(server.concat(`/items/${itemId}`),
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
    }, [itemId, onLoadCompleted])

    useEffect(() => {
        if (reload) {
            fetchItem();
        }
    }, [reload, fetchItem]);

    return (
        <div className='Body'>
            <Header></Header>
            <div key={item.id} className='ItemList'>
                {item.isImage ?
                    <img src={server + "/image/" + item.image_filename} alt="" height="400" className='ItemDetailsImg' />
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
        </div >
    )
};


export default ItemDetail