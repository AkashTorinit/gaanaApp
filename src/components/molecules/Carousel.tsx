import React, { Component } from 'react';

import { Carousel } from 'react-responsive-carousel';

const COu = () => {
	
		return (
			<div>
			<h2>NextJs Carousel - GeeksforGeeks</h2>
			<Carousel>
				<div>
					<img src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172224/1.png" alt="image1"/>
					<p className="legend">Image 1</p>

				</div>
				<div>
					<img src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172229/5.png" alt="image2" />
					<p className="legend">Image 2</p>

				</div>
				<div>
					<img src="https://media.geeksforgeeks.org/wp-content/uploads/20211213172227/4.png" alt="image3"/>
					<p className="legend">Image 3</p>

				</div>
				
			</Carousel>
			</div>
		);
	
};

export default COu;
