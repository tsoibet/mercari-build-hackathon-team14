import Header from "../components/Header/index";
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Image {
    filename: string;
    isImage: boolean
};


interface Prop {
    reload?: boolean;
    onLoadCompleted?: () => void;
}

const ItemDetail: React.FC<Prop> = (props) => {
    const { reload = true, onLoadCompleted } = props;
    const { itemId } = useParams()
    const [item, setItem] = useState({
        "id": 0,
        "name": "tmp",
        "category": "tmp",
        "image_filename": "tmp.jpg",
        "user_id": 0,
        "oneliner_description": "tmp",
        "detailed_description": "tmp",
        "price": 0,
        "isImage": true
    })
    const [images, setImages] = useState<Image[]>([])
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

    const fetchImage = useCallback(() => {
        fetch(server.concat(`/items/image/${itemId}`),
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
                let tmpImp = []
                if (data.quantity === 1) {
                    console.log("1 pic")
                    tmpImp.push({ filename: data.file1, isImage: true })
                }
                if (data.quantity === 2) {
                    console.log("2 pic")
                    tmpImp.push({ filename: data.file1, isImage: true })
                    tmpImp.push({ filename: data.file2, isImage: true })
                }
                if (data.quantity === 3) {
                    console.log("3 pic")
                    tmpImp.push({ filename: data.file1, isImage: true })
                    tmpImp.push({ filename: data.file2, isImage: true })
                    tmpImp.push({ filename: data.file3, isImage: true })
                }
                if (data.quantity === 4) {
                    console.log("4 pic")
                    tmpImp.push({ filename: data.file1, isImage: true })
                    tmpImp.push({ filename: data.file2, isImage: true })
                    tmpImp.push({ filename: data.file3, isImage: true })
                    tmpImp.push({ filename: data.file4, isImage: true })
                }
                if (data.quantity === 5) {
                    console.log("5 pic")
                    tmpImp.push({ filename: data.file1, isImage: true })
                    tmpImp.push({ filename: data.file2, isImage: true })
                    tmpImp.push({ filename: data.file3, isImage: true })
                    tmpImp.push({ filename: data.file4, isImage: true })
                    tmpImp.push({ filename: data.file5, isImage: true })
                }
                for (let i = 0; i < tmpImp.length; i++)
                    if (!tmpImp[i].filename.includes("jpg")) tmpImp[i].isImage = false
                console.log(tmpImp)
                setImages(tmpImp);
                onLoadCompleted && onLoadCompleted();
            })
            .catch(error => {
                console.error('GET error:', error)
            })
    }, [itemId, onLoadCompleted])

    useEffect(() => {
        if (reload) {
            fetchItem();
            fetchImage();
        }
    }, [reload, fetchItem, fetchImage]);

    return (
        <div className='Body'>
            <Header></Header>
            <div>
                {item.isImage ?
                    <img src={server + "/image/" + item.image_filename} alt="" height="400" className='ItemDetailsImg' />
                    :
                    <div className="ItemImage">
                        <video controls muted height="140">
                            <source src={server + "/image/" + item.image_filename} type="video/mp4"></source>
                        </video>
                    </div>
                }
            </div>
            <div>
                {images.map((image) => {
                    return (
                        <div>
                            {image.isImage ?
                                <img src={server + "/image/" + image.filename} height="140" alt="No pic" />
                                :
                                <video controls muted height="140">
                                    <source src={server + "/image/" + image.filename} type="video/mp4" />
                                </video>}
                        </div>
                    )
                })}
            </div>
            <div key={item.id} className='ItemList'>
                <p>
                    <span>Name: {item.name}</span>
                    <br />
                    <span>Category: {item.category}</span>
                    <br />
                    <span>Description: {item.detailed_description}</span>
                    <br />
                    <span>Price: ${item.price}</span>
                </p>
            </div>
        </div >
    )
};


export default ItemDetail