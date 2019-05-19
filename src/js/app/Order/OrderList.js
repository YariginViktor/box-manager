import { humanFormateDate } from '../../fw/utils'

const OrderList = ({ list, removeOrder, editOrder }) =>
	<ul className="bm-list">
		{list.map((item, i) => 
			<li key={i}>
				<div className="bm-list-title">{item.title}</div>
				<div className="bm-list-name">{item.user}</div>
				<div className="bm-list-phone">{item.phone}</div>
				<div className="bm-list-date">{humanFormateDate(item.date)}</div>
				<div className="bm-list-boxes">
					{item.boxes.map(box =>
						<span>{box.data.title}</span>
					)}
				</div>
				<div id={item._id} className="bm-list-del" onClick={removeOrder} >Удалить</div>
				<div id={item._id} className="bm-list-edit" onClick={editOrder} >Редактировать</div>
			</li>
		)}
	</ul>

export default OrderList