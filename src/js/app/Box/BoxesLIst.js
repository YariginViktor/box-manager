const Boxeslist = ({ list, removeBox, editBox }) =>
	<ul className="bm-list bm-list-products">
		{list.map((item, i) => 
			<li key={i}>
				<div className="bm-list-ico" style={{backgroundImage: `url(${item.ico})`}}></div>
				<div className="bm-list-title">{item.title}</div>
				<div className="bm-list-descr">{item.descr}</div>
				<div className="bm-list-price">{item.price}</div>
				<div id={item._id} className="bm-list-del" onClick={removeBox} >Удалить</div>
				<div id={item._id} className="bm-list-edit" onClick={editBox} >Редактировать</div>
			</li>
		)}
	</ul>

export default Boxeslist