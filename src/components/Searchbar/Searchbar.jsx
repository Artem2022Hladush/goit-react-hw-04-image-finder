import {BsSearch} from "react-icons/bs"
import { useState } from "react";
import css from "../Searchbar/Searchbar.module.css"
import PropTypes from "prop-types"



export function Searchbar({onSubmit}){
	const [inputText, setInputText] = useState('')

	
	const handleChange=e=> {
		setInputText(e.target.value)
	}

	const handleSublmit=e=>{
		e.preventDefault();

		if(inputText.trim() === ' ') {
			return;
		}
		onSubmit(inputText);
		setInputText(' ')
	}
	
		return (
			<header className={css.Searchbar}>
		<form onSubmit={handleSublmit} className={css.SearchForm}>
			<button type="submit" className={css.SearchForm__button}>
				<BsSearch />
				<span className={css.SearchForm_button_label}></span>
			</button>
	
			<input
			className={css.SearchForm__input}
			type="text"
			value={inputText}
			autoComplete="off"
			autoFocus
			placeholder="Search images and photos"
			onChange={handleChange}
			/>
		</form>
	</header>
		)
};

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};