import React from "react";
import mercariLogo from "../../assets/mercariLogo.png";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";

const Header: React.FC = () => {
	return (
		<div className="Header">
			<div>
				<img className="Header__logo" src={mercariLogo}></img>
			</div>
			{/* <div> */}
			<div>
				<Button type="primary" className="Header__button">
					List an Item
				</Button>
				<Avatar icon={<UserOutlined />} />
			</div>
			{/* </div> */}
		</div>
	);
};

export default Header;
