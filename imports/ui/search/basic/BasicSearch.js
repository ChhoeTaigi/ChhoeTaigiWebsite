import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ReactGA from 'react-ga4';
import { stringify } from '../../../api/utils/url-helper';
import basicTranslations from '../../../translations/basic.json';

let state = {
	searchMethod: 'equals',
	spellingMethod: 'PojInput',
	spelling: '',
	taibun: '',
	hoabun: '',
	english: '',
	jitbun: '',
};

class BasicSearch extends Component {
	constructor(props) {
		super(props);

		props.addTranslation(basicTranslations);

		this.state = state;
	}

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	componentWillUnmount() {
		state = this.state;
	}

	handleSubmit(event) {
		// ReactGA.event({
		// 	category: 'user',
		// 	action: 'search',
		// 	label: 'basic'
		// });

		if (this.state.searchMethod === 'equals') {
			this.state.spelling = this.state.spelling.trim();
			this.state.taibun = this.state.taibun.trim();
			this.state.english = this.state.english.trim();
			this.state.jitbun = this.state.jitbun.trim();
			this.state.hoabun = this.state.hoabun.trim();
		}

		// normalize input to Unicode standard
		this.state.spelling = this.state.spelling.normalize("NFC");
		this.state.taibun = this.state.taibun.normalize("NFC");
		this.state.english = this.state.english.normalize("NFC");
		this.state.jitbun = this.state.jitbun.normalize("NFC");
		this.state.hoabun = this.state.hoabun.normalize("NFC");

		const options = {
			method: 'basic',
			searchMethod: this.state.searchMethod,
			spellingMethod: this.state.spellingMethod,
			columns: {
				spelling: this.state.spelling,
				taibun: this.state.taibun,
				english: this.state.english,
				jitbun: this.state.jitbun,
				hoabun: this.state.hoabun,
			},
		}

		this.props.history.push({
			pathname: 'search',
			search: stringify(options),
		});

		event.preventDefault();
	}

	handleInput(event) {
		let key = event.target.name;
		let value = event.target.value;
		let state = [];
		state[key] = value;
		this.setState(state);
	}

	resetAllInput = () => {
		this.setState({
			spelling: "",
			taibun: "",
			hoabun: "",
			english: "",
			jitbun: ""
		});
	}

	donateButtonClick = () => {
		window.open("https://r.zecz.ec/oiML", '_blank').focus();
	}

	render() {
		return (
			<div>
				<div className='site-banner'>
					<div className='container'>
						<div className='site-banner__wrapper'>
							<div className='site-banner__text'>
								<img src='images/home_image_text@2x.png' alt="ChhoeTaigi 台語辭典⁺" />
							</div>
							<div className='site-banner__bg'>
								<img src='images/home_image_bg@2x.png' />
							</div>
						</div>
					</div>
				</div>
				<div className='basic-search'>
					<form id='basic-form' className='container' onSubmit={this.handleSubmit.bind(this)} autoComplete='off'>
						<h2><Translate id="basic" /></h2>
						<div className='basic-search__form-wrapper'>
							<div className='basic-search__top'>
								<div className='basic-search__mode'>
									<h3><Translate id="search-method" /></h3>
									<label className='radio-simulated'>
										<input type="radio" className='radio-simulated__hidden' name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
										<span className='radio-simulated__text'><Translate id="equals" /></span>
									</label>
									<label className='radio-simulated'>
										<input type="radio" className='radio-simulated__hidden' name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
										<span className='radio-simulated__text'><Translate id="contains" /></span>
									</label>
								</div>
								<div className='basic-search__note'>
									<Link to='/annachhoe'><Translate id="explanation" /></Link>
								</div>
							</div>
							<div className='basic-search__bottom'>
								<h3><Translate id="input-method" /></h3>
								<div className='search-block'>
									<label className='search-block__left' htmlFor='spelling'><Translate id="lmj-tb" /></label>
									<div className='search-block__right search-block__lmj'>
										<div className='search-block__lmj-top'>
											<label className='radio-simulated'>
												<input type="radio" className="radio-simulated__hidden" name="spellingMethod" value="PojInput" defaultChecked={this.state.spellingMethod === 'PojInput'} onChange={this.handleInput.bind(this)} />
												<span className='radio-simulated__text'><Translate id="poj-input" /></span>
											</label>
											<label className='radio-simulated'>
												<input type="radio" className="radio-simulated__hidden" name="spellingMethod" value="PojUnicode" defaultChecked={this.state.spellingMethod === 'PojUnicode'} onChange={this.handleInput.bind(this)} />
												<span className='radio-simulated__text'><Translate id="poj" /></span>
											</label>
											<label className='radio-simulated'>
												<input type="radio" className="radio-simulated__hidden" name="spellingMethod" value="KipInput" defaultChecked={this.state.spellingMethod === 'KipInput'} onChange={this.handleInput.bind(this)} />
												<span className='radio-simulated__text'><Translate id="lmj-input" /></span>
											</label>
											<label className='radio-simulated'>
												<input type="radio" className="radio-simulated__hidden" name="spellingMethod" value="KipUnicode" defaultChecked={this.state.spellingMethod === 'KipUnicode'} onChange={this.handleInput.bind(this)} />
												<span className='radio-simulated__text'><Translate id="lmj" /></span>
											</label>
										</div>
										<div className='search-block__lmj-bottom'>
											<input type="text" name="spelling" placeholder={this.props.translate('lmj_keyword')} value={this.state.spelling} onChange={this.handleInput.bind(this)} />
										</div>
									</div>
								</div>
								<div className='search-block'>
									<label className='search-block__left' htmlFor="taibun"><Translate id="corresponding-tb" /></label>
									<div className='search-block__right'>
										<input type="text" name="taibun" placeholder={this.props.translate('hanlo_keyword')} value={this.state.taibun} onChange={this.handleInput.bind(this)} />
									</div>
								</div>
								<div className='search-block'>
									<label className='search-block__left' htmlFor="english"><Translate id="corresponding-en" /></label>
									<div className='search-block__right'>
										<input type="text" name="english" placeholder={this.props.translate('engbun_keyword')} value={this.state.english} onChange={this.handleInput.bind(this)} />
									</div>
								</div>
								<div className='search-block'>
									<label className='search-block__left' htmlFor="jitbun"><Translate id="corresponding-jp" /></label>
									<div className='search-block__right'>
										<input type="text" name="jitbun" placeholder={this.props.translate('jitbun_keyword')} value={this.state.jitbun} onChange={this.handleInput.bind(this)} />
									</div>
								</div>
								<div className='search-block'>
									<label className='search-block__left' htmlFor="hoabun"><Translate id="corresponding-hb" /></label>
									<div className='search-block__right'>
										<input type="text" name="hoabun" placeholder={this.props.translate('tiongbun_keyword')} value={this.state.hoabun} onChange={this.handleInput.bind(this)} />
									</div>
								</div>
							</div>
							<div className='basic-search__actions search-actions'>
								<input className='btn btn--search' type="submit" value={this.props.translate('find')} />
								<input className='btn btn--clear' type="button" value={this.props.translate('reset')} onClick={this.resetAllInput} />
								<input className='btn btn--donate' type="button" value={this.props.translate('donate')} onClick={this.donateButtonClick} />
							</div>
							<footer className="basic-search__kesimi">
								<p>
									<Translate id="support_taibun_kesimi_part1" /><a target="_blank" href="https://r.zecz.ec/ZAaP"><Translate id="support_taibun_kesimi_part2" /></a><br />
									<Translate id="support_taibun_kesimi_part3" /><br />
									<Translate id="support_taibun_kesimi_part4" />
								</p>
							</footer>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default withLocalize(withRouter(BasicSearch));
