const BoxSelectProducts = ({items, addItem}) =>
	items.length ?
	<ul>
		{ items.map((item, i) => 
			<li key={i}>
				<div className="bm-form-select-product-list-item">
					<div className="bm-form-select-product-list-ico" style={{backgroundImage: `url(${item.ico})`}}></div>
					<div className="bm-form-select-product-list-name">{item.title}</div>
					<div className="bm-form-select-product-list-price">{item.price} p.</div>
					<div className="bm-btn" id={item._id} onClick={addItem}>Добавить</div>
				</div>
			</li>
		)}
	</ul> :
	'Список пуст'

export default BoxSelectProducts