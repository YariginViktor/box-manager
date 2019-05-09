const OrderList = ({ list }) =>
	<ul className="bm-order-list">
		{list.map((item, i) => 
			<li key={i}>
				<div>{item.title}</div>
				<div>{item.user}</div>
				<div>{item.phone}</div>
				<div>{item.date}</div>
				<div>
					{item.boxes.join(', ')}
				</div>
			</li>
		)}
	</ul>

export default OrderList