import Header from "../../components/Header/index";
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Carousel, Col, Divider, Image, Row, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
 
import "./style.scss";
 
const { Title, Paragraph } = Typography;
 
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
       <div className='ItemDetailsPage'>
           <Header />
           <div className="ItemDetailsPage__container">
               <Link to={"/"}>
                   <div className="ItemDetailsPage__container__nav">
                       <ArrowLeftOutlined style={{ marginRight: "10px" }} />
                       Back to Home
                   </div>
               </Link>
 
               {/* <p className="ItemDetailsPage__container__title">{item.name}</p> */}
               <Row gutter={[24, 16]} justify="space-around" align="middle">
                   <Col md={12} style={{ textAlign: "center" }}>
                       {images.length > 0? (images.length > 1? <Carousel autoplay autoplaySpeed={5000} style={{ height: "200px", width: "100%", textAlign: "center" }}>
                           {images.map((image) => {
                               return (image.isImage ?
                                   <Image src={server + "/image/" + image.filename} height="200px" alt="" />
                                   :
                                   <video controls height="200px" muted>
                                       <source src={server + "/image/" + image.filename} type="video/mp4" />
                                   </video>
                               )
                           })}
                       </Carousel>:
                           (images[0].isImage ?
                               <Image src={server + "/image/" + images[0].filename} height="200px" alt="" />
                               :
                               <video controls height="200px" muted>
                                   <source src={server + "/image/" + images[0].filename} type="video/mp4" />
                               </video>)): <div>loading</div>
                       }
                   </Col>
                   <Col md={12}>
                       <Title>{item.name}</Title>
                       <Title level={2}>${item.price}</Title>
                       <Paragraph>{item.oneliner_description}</Paragraph>
                       {/* <span>Category: {item.category}</span> */}
                       <Button type="primary" className="ItemDetailsPage__button ItemDetailsPage__button__primary">Buy</Button>
                       <Button className="ItemDetailsPage__button">Ask a question</Button>
                   </Col>
               </Row>
               <Divider orientation="left">Seller description</Divider>
               <Row>
                   <Col span={24}>
                       <Paragraph>{item.detailed_description}</Paragraph>
                   </Col>
               </Row>
           </div>
       </div >
   )
};
 
 
export default ItemDetail