import { useEffect } from "react"
import css from "../Modal/Modal.module.css"
import PropTypes from "prop-types"

export function Modal({src, onClose}){
	useEffect(()=> {
		const handleModal =e=>{
			if(e.code === "Escape") {
				onClose();
			};
	};
	window.addEventListener('keydown', handleModal);
			return () => window.removeEventListener('keydown', handleModal);
	}, [onClose]);


const handleBackDropClick=e=>{
	if(e.currentTarget === e.target){
		onClose()
	}
}

	
		return(
			<div className={css.Overlay} onClick={handleBackDropClick}>
	<div className={css.Modal}>
   	<img src={src} alt="largeImage" />
	</div>
</div>
		)
}

Modal.propTypes = {
	src: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
}

