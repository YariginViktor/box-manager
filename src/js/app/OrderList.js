const OrderList = ({ list }) =>
	<ul className="bm-order-list">
		{list.map((item, i) => 
			<li key={i}>{item.title}</li>
		)}
	</ul>

export default OrderList