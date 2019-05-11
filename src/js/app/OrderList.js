const humanFormateDate = (date) => {
	const lead0 = (num) => {
		return num < 10 ? '0' + num : num
	}
	const d = new Date(date)
	return lead0(d.getDate()) + '.' + lead0(d.getMonth() + 1) + '.' + d.getFullYear()
}

const OrderList = ({ list, removeOrder, editOrder }) =>
	<ul className="bm-order-list">
		{list.map((item, i) => 
			<li key={i}>
				<div className="bm-order-list-title">{item.title}</div>
				<div className="bm-order-list-name">{item.user}</div>
				<div className="bm-order-list-phone">{item.phone}</div>
				<div className="bm-order-list-date">{humanFormateDate(item.date)}</div>
				<div className="bm-order-list-boxes">
					{item.boxes.join(', ')}
				</div>
				<div id={item._id} className="bm-order-list-del" onClick={removeOrder} >Удалить</div>
				<div id={item._id} className="bm-order-list-edit" onClick={editOrder} >Редактировать</div>
			</li>
		)}
	</ul>

export default OrderList