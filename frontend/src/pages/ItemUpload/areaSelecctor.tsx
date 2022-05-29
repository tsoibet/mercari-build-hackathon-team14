import React, { useState } from "react";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";

const ExampleComponent = () => {
	const [areas, setAreas] = useState<IArea[]>([]);

	const onChangeHandler = (areas: IArea[]) => {
		setAreas(areas);
	};

	return (
		<AreaSelector areas={areas} onChange={onChangeHandler}>
			<img src="my-image.jpg" alt="my image" />
		</AreaSelector>
	);
};

export default ExampleComponent;
