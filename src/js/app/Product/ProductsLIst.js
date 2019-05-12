const ProductsList = ({ list, removeProduct, editProduct }) =>
	<ul className="bm-list">
		{list.map((item, i) => 
			<li key={i}>
				<div className="bm-list-ico" style={{backgroundImage: `url(${item.ico})`}}></div>
				<div className="bm-list-title">{item.title}</div>
				<div className="bm-list-descr">{item.descr}</div>
				<div className="bm-list-price">{item.price}</div>
				<div id={item._id} className="bm-list-del" onClick={removeProduct} >Удалить</div>
				<div id={item._id} className="bm-list-edit" onClick={editProduct} >Редактировать</div>
			</li>
		)}
	</ul>

export default ProductsList