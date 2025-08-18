import React from 'react';
import FormsWrapper from '../../components/book/FormsWrapper';
import bg from '/public/bg.png';

export default function Book() {
		
		return (
				<div className='book-main-page-new' style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
						<div className="overlay">
							<div className="container m-auto">
								<div className="book-cont">
								<FormsWrapper />
								</div>
							</div>
						</div>
					</div>
		);
}
