import { useState } from "react";
import { ItemList } from "../../components/ItemList";
import Header from "../../components/Header";
import HomepageCover from "../../assets/HomepageCover.png";
import "./style.scss";

function HomePage() {
	const [reload, setReload] = useState(true);
	return (
		<div>
			<Header></Header>
			<div style={{ backgroundColor: "#F9FBFC" }}>
				<div
					style={{ position: "relative", textAlign: "center", color: "white" }}
				>
					<img src={HomepageCover} style={{ width: "100%" }}></img>
					<span
						style={{
							position: "absolute",
							top: "40%",
							left: "76px",
							fontSize: "40px",
							fontWeight: "800",
							textAlign: "left",
						}}
					>
						Find what you need, <br />
						sell what you don't
					</span>
				</div>
				<p
					style={{
						color: "#Ab2718",
						fontWeight: "800",
						fontSize: "28px",
						padding: "calc(2vh + 1.5vw) 5vw",
						paddingBottom: "0px",
						marginBottom: "-10px",
					}}
				>
					Featured Items
				</p>
				<ItemList reload={reload} onLoadCompleted={() => setReload(false)} />
			</div>
		</div>
	);
}

export default HomePage;
