import React from "react";
import Header from "../../components/Header";
import "./style.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";


const { Meta } = Card;

const ListingOptionPage: React.FC = () => {
	return (
		<div className="ListingOptionPage">
            <Header />
            <div className="ListingOptionPage__container">
                <div className="ListingOptionPage__container__nav">
					<ArrowLeftOutlined style={{ marginRight: "10px" }} />
					Back to Listing Option Page
				</div>
                <p className="ListingOptionPage__container__title">Start listing by...</p>
                <div className="ListingOptionPage__container__cards">
                    <Card
                        className="ListingOptionPage__container__cards__optionOne"
                        hoverable
                        style={{ width: 240 }}
                        cover={
                        <svg width="72" height="60" viewBox="0 0 72 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M64.875 9.34375H53.7188L51.0609 1.89531C50.8773 1.38564 50.5408 0.945077 50.0974 0.633816C49.654 0.322555 49.1253 0.155772 48.5836 0.156251H23.4164C22.309 0.156251 21.3164 0.853516 20.9473 1.89531L18.2812 9.34375H7.125C3.49922 9.34375 0.5625 12.2805 0.5625 15.9063V53.3125C0.5625 56.9383 3.49922 59.875 7.125 59.875H64.875C68.5008 59.875 71.4375 56.9383 71.4375 53.3125V15.9063C71.4375 12.2805 68.5008 9.34375 64.875 9.34375ZM65.5312 53.3125C65.5312 53.6734 65.2359 53.9688 64.875 53.9688H7.125C6.76406 53.9688 6.46875 53.6734 6.46875 53.3125V15.9063C6.46875 15.5453 6.76406 15.25 7.125 15.25H22.4402L23.843 11.3289L25.7215 6.0625H46.2703L48.1488 11.3289L49.5516 15.25H64.875C65.2359 15.25 65.5312 15.5453 65.5312 15.9063V53.3125ZM36 20.5C28.7484 20.5 22.875 26.3734 22.875 33.625C22.875 40.8766 28.7484 46.75 36 46.75C43.2516 46.75 49.125 40.8766 49.125 33.625C49.125 26.3734 43.2516 20.5 36 20.5ZM36 41.5C31.6523 41.5 28.125 37.9727 28.125 33.625C28.125 29.2773 31.6523 25.75 36 25.75C40.3477 25.75 43.875 29.2773 43.875 33.625C43.875 37.9727 40.3477 41.5 36 41.5Z" fill="black"/>
                        </svg>
                        }
                    >
                        <Meta title="Upload an image" />
                    </Card>

                    <Card
                        className="ListingOptionPage__container__cards__optionTwo"
                        hoverable
                        style={{ width: 240 }}
                        cover={
                        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1395 52.6875C12.3035 52.6875 12.4676 52.6711 12.6316 52.6465L26.4293 50.2266C26.5934 50.1937 26.7492 50.1199 26.8641 49.9969L61.6371 15.2238C61.7132 15.1479 61.7735 15.0578 61.8147 14.9586C61.8558 14.8593 61.877 14.7529 61.877 14.6455C61.877 14.5381 61.8558 14.4317 61.8147 14.3325C61.7735 14.2332 61.7132 14.1431 61.6371 14.0672L48.0035 0.425391C47.8477 0.269531 47.6426 0.1875 47.4211 0.1875C47.1996 0.1875 46.9945 0.269531 46.8387 0.425391L12.0656 35.1984C11.9426 35.3215 11.8687 35.4691 11.8359 35.6332L9.41602 49.4309C9.33622 49.8703 9.36473 50.3226 9.49909 50.7485C9.63345 51.1745 9.8696 51.5613 10.1871 51.8754C10.7285 52.4004 11.4094 52.6875 12.1395 52.6875ZM17.6684 38.3812L47.4211 8.63672L53.434 14.6496L23.6812 44.3941L16.3887 45.682L17.6684 38.3812ZM63.1875 59.5781H2.8125C1.36055 59.5781 0.1875 60.7512 0.1875 62.2031V65.1562C0.1875 65.5172 0.482812 65.8125 0.84375 65.8125H65.1562C65.5172 65.8125 65.8125 65.5172 65.8125 65.1562V62.2031C65.8125 60.7512 64.6395 59.5781 63.1875 59.5781Z" fill="black"/>
                        </svg>
                        }
                    >
                        <Meta title="Fill in item details" />
                    </Card>

                    <Card hoverable className="ListingOptionPage__container__cards__pastPurchases" title="Past Purchases" headStyle={{fontSize: "1.2rem", color: "#AB2718", fontWeight: "bold", textAlign: "center"}}>
                        <div className="ListingOptionPage__container__cards__pastPurchases__item"> 
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__picture"></div>
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__details">
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__name">Fry Pan (From amazon)</div>
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__price">$200</div>
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__people">30 people are searching for this!</div>
                            </div>
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__button">
                                List this item
                            </div>
                        </div>

                        <div className="ListingOptionPage__container__cards__pastPurchases__item"> 
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__picture"></div>
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__details">
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__name">Fry Pan (From amazon)</div>
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__price">$200</div>
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__people">30 people are searching for this!</div>
                            </div>
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__button">
                                List this item
                            </div>
                        </div>

                        <div className="ListingOptionPage__container__cards__pastPurchases__item"> 
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__picture"></div>
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__details">
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__name">Fry Pan (From amazon)</div>
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__price">$200</div>
                                <div className="ListingOptionPage__container__cards__pastPurchases__item__details__people">30 people are searching for this!</div>
                            </div>
                            <div className="ListingOptionPage__container__cards__pastPurchases__item__button">
                                List this item
                            </div>
                        </div>

                        <div className="ListingOptionPage__container__cards__pastPurchases__showMore">Show more...</div>
                    </Card>
                </div>
            </div>
            
		</div>
	);
};

export default ListingOptionPage;