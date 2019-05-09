const OrderList = ({ list, removeOrder }) =>
	<ul className="bm-order-list">
		{list.map((item, i) => 
			<li key={i}>
				<div className="bm-order-list-title">{item.title}</div>
				<div className="bm-order-list-name">{item.user}</div>
				<div className="bm-order-list-phone">{item.phone}</div>
				<div className="bm-order-list-date">{item.date}</div>
				<div className="bm-order-list-boxes">
					{item.boxes.join(', ')}
				</div>
				<div id={item._id} className="bm-order-list-del" onClick={removeOrder} >Удалить</div>
			</li>
		)}
	</ul>

export default OrderList