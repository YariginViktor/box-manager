const BoxComposition = ({items, upItemCount, downItemCount}) =>
	items.length ?
	<ol>
		{ items.map((item, i) => 
			<li key={i}>
				<div className="bm-form-composition-list-item" id={item.data._id}>
					<div className="bm-form-composition-list-name">{item.data.title}</div>
					<div className="bm-form-composition-list-price">{item.data.price} p.</div>
					<div className="bm-form-composition-list-counter">
						<div className="bm-form-composition-list-edit" onClick={upItemCount}>+</div>
						<div className="bm-form-composition-list-count">{item.value}</div>
						<div className="bm-form-composition-list-edit" onClick={downItemCount}>-</div>
					</div>
				</div>
			</li>
		)}
	</ol> :
	'Список пуст'

export default BoxComposition