const BoxComposition = ({items, upItemCount, downItemCount}) =>
	items.length ?
	<ol>
		{ items.map((item, i) => 
			<li key={i}>
				<div className="bm-form-product-list-item" id={item.data._id}>
					<div className="bm-form-product-list-name">{item.data.title}</div>
					<div className="bm-form-product-list-price">{item.data.price} p.</div>
					<div className="bm-form-product-list-counter">
						<div className="bm-form-product-list-edit" onClick={upItemCount}>+</div>
						<div className="bm-form-product-list-count">{item.value}</div>
						<div className="bm-form-product-list-edit" onClick={downItemCount}>-</div>
					</div>
				</div>
			</li>
		)}
	</ol> :
	'В этот набор еще ничего не добавили'

export default BoxComposition