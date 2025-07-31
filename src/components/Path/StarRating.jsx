
const StarRating = ({ rating = 0, outOf = 5 }) => (
	<div className="flex items-center gap-1">
		<span className="text-gray-700 font-bold text-2xl">({rating})</span>
		{[...Array(outOf)].map((_, i) => (
			<svg
				key={i}
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill={i < Math.floor(rating) ? "#FFD600" : "#D1D5DB"}
				className="inline-block"
			>
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		))}
	</div>
);

export default StarRating;