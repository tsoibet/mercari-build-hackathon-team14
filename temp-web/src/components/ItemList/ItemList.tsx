import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  category: string;
  image_filename: string;
  isImage: boolean;
};

const server = process.env.API_URL || 'http://127.0.0.1:9000';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
}

export const ItemList: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted } = props;
  const [items, setItems] = useState<Item[]>([])
  const fetchItems = () => {
    fetch(server.concat('/items'),
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
        for (var i = 0; i < data.items.length; i++) {
          if (data.items[i].image_filename.includes(".jpg")) { data.items[i].isImage = true }
          else data.items[i].isImage = false
        }
        setItems(data.items);
        console.log('GET success:', data.items);
        onLoadCompleted && onLoadCompleted();
      })
      .catch(error => {
        console.error('GET error:', error)
      })
  }

  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);

  return (
    <div className='ItemListGrid'>
      {items.map((item) => {
        return (
          <div key={item.id} className='ItemList'>
            {item.isImage ?
              <div className="ItemImage" >
                <Link to={`/items/${item.id}`}>
                  <img src={server + "/image/" + item.image_filename} height="140" alt="No pic" />
                </Link>
              </div> :
              <div className="ItemImage">
                <Link to={`/items/${item.id}`}>
                  <video controls muted height="140">
                    <source src={server + "/image/" + item.image_filename} type="video/mp4" />
                  </video>
                </Link>
              </div>}
            <div className="ItemDescriptions">
              <span className="ItemName">{item.name}</span>
              <span className="ItemCategory">{item.category}</span>
            </div>
          </div>
        )
      })}
    </div >
  )
};
