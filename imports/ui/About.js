import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import aboutTranslations from '../translations/about.json';

class About extends Component {
	constructor(props) {
		super(props);

		props.addTranslation(aboutTranslations);

		this.state = {
			contactRef: React.createRef(),
		};
	}

	openGithub() {
		window.open('https://github.com/ChhoeTaigi', '_blank')
	}

	gotoContact() {
		const domNode = ReactDOM.findDOMNode(this.state.contactRef.current);
        window.scrollTo(0, domNode.offsetTop);
	}

	render() {
		return (
			<div>
				<div id='introduction-title' className='about-title'><Translate id='introduction' /></div>
				<div id='brief-container'>
					<div className='fix-width-center'>
						<ul id='brief-ul'>
							<li className='brief-li'><Translate id='bullet-1' /></li>
							<li className='brief-li'><Translate id='bullet-2' /></li>
						</ul>
					</div>
				</div>
				<div id='feature-container'>
					<div id='feature-title' className='about-title'><Translate id='feature' /></div>
					<div className='feature-card-three-columns'>
						<div className='feature-card'>
							<img id='feature-1' src='images/data@2x.png' width='136' height='107'></img>
							<span className='feature-card-title'><Translate id='feature-title-1' /></span>
							<span className='feature-card-content'><Translate id='feature-content-1' /></span>
						</div>
						<div className='feature-card'>
							<img id='feature-2' src='images/standard@2x.png' width='178' height='99'></img>
							<span className='feature-card-title'><Translate id='feature-title-1' /></span>
							<span className='feature-card-content'><Translate id='feature-content-2' /></span>
						</div>
						<div className='feature-card'>
							<img id='feature-3' src='images/digital@2x.png' width='118' height='94'></img>
							<span className='feature-card-title'><Translate id='feature-title-1' /></span>
							<span className='feature-card-content'><Translate id='feature-content-3' /></span>
						</div>
					</div>
					<div className='feature-card-two-columns'>
						<div className='feature-card'>
							<img id='feature-4' src='images/opencc@2x.png' width='129' height='91'></img>
							<span className='feature-card-title'><Translate id='feature-title-1' /></span>
							<span className='feature-card-content'><Translate id='feature-content-4' /></span>
						</div>
						<div className='feature-card'>
							<img id='feature-5' src='images/service@2x.png' width='135' height='93'></img>
							<span className='feature-card-title'><Translate id='feature-title-1' /></span>
							<span className='feature-card-content'><Translate id='feature-content-5' /></span>
						</div>
					</div>
				</div>
				<div id='join-container'>
					<div id='join-title' className='about-title'><Translate id='join' /></div>
					<div id='join-box-1' className='join-box'>
						<img src='images/discuss@2x.png' width='180' height='173'></img>
						<div><Translate id='join-1' /></div>
						<button onClick={this.gotoContact.bind(this)}></button>
						<span onClick={this.gotoContact.bind(this)}><Translate id='join-2' /></span>
					</div>
					<div id='join-box-2' className='join-box'>
						<div><Translate id='join-3' /></div>
						<button onClick={this.openGithub.bind(this)}>GitHub</button>
						<img src='images/participate@2x.png' width='256' height='150'></img>
					</div>
				</div>
				<div id='seeking-container'>
					<div id='seeking-title' className='about-title'><Translate id='sponsor' /></div>
					<ol id='seeking-ol'>
						<li><Translate id='sponsor-1' /></li>
						<li><Translate id='sponsor-2' /></li>
					</ol>
				</div>
				<div id='contact-container'>
					<div ref={this.state.contactRef} id='contact-title' className='about-title'><Translate id='contact' /></div>
					<div id='contact-buttons-container'>
						<a id='contact-button-1' className='contact-button' href='http://chat.taigi.info/' target='_blank'>
							<span><Translate id='contact-1' /></span>
							<div></div>
						</a>
						<a id='contact-button-2' className='contact-button' href='mailto:ngoohebi+chhoetaigi@gmail.com' target='_blank'>
							<span><Translate id='contact-2' /></span>
							<div></div>
						</a>
					</div>
				</div>
				<div id='members-container' className='fix-width-center'>
					<div id='members-title' className='about-title'><Translate id='members' /></div>
					<div className='person-card-three-columns'>
						<div className='person-card'>
							<img className='profile' src='images/hebi.png' width='120' height='120'></img>
							<div className='name'>Hê-bí</div>
							<div className='title'>Sàu thô͘-kha kiam kòng cheng.</div>
							<div className='description'>Khiàn-phang ēng--ê. Lâi chú 1 tiáⁿ phang-kòng-kòng ê Tâi-gí moâi.</div>
						</div>
						<div className='person-card'>
							<img className='profile' src='images/titeng.png' width='120' height='120'></img>
							<div className='name'>Tìtêng</div>
							<div className='title'>Hū-chek kiò ta̍k-ke hun-thâu mài loān-tàn</div>
							<div className='description'>Jîn-seng chhiūⁿ tàu-tô͘, tàu chı̍t-pak chhit-chhái ê Tâi-gí tô͘.</div>
						</div>
						<div className='person-card'>
							<img className='profile' src='images/buncheng.png' width='120' height='120'></img>
							<div className='name'>BûnCheng</div>
							<div className='title'>Iau-pá-chhá</div>
							<div className='description'>Tâi-oân-lâng. Tâi-gí. To̍k-li̍p Kiàn-kok.</div>
						</div>
					</div>
					<div className='person-card-two-columns'>
						<div className='person-card'>
							<img className='profile' src='images/eyes.png' width='120' height='120'></img>
							<div className='name'>Eyes</div>
							<div className='title'>網頁設計</div>
							<div className='description'>小時候講台語大人還聽得懂，長大後卻被唸聽無(Thiaⁿ bô)...</div>
						</div>
						<div className='person-card'>
							<img className='profile' src='images/leo.png' width='120' height='120'></img>
							<div className='name'>Leo Wu</div>
							<div className='title'>網頁前後端</div>
							<div className='description'>台語用羅馬字拼音更有趣</div>
						</div>
					</div>
				</div>
				<div id='authorization'>
					<div id='authorization-title-container'>
						<div id='authorization-title'><Translate id='authorization' /></div>
					</div>
					<div id='authorization-left-bg'></div>
					<div id='authorization-right-bg'></div>
					<div id='authorization-content-center'>
						<div id='authorization-content'>
							<div className='authorization-block' style={{left: '100px'}}>
								<div className='authorization-title'><Translate id='authorization-1' /></div>
								<a className='authorization-link' href='https://github.com/ChhoeTaigi/ChhoeTaigiDatabase' target='_blank'>ChhoeTaigi 找台語：台語字詞資料庫</a>
							</div>
							<div className='authorization-block' style={{right: '62px'}}>
								<div className='authorization-title'><Translate id='authorization-2' /></div>
								<a className='authorization-link' href='http://ip194097.ntcu.edu.tw/memory/tgb/MoWT.asp' target='_blank'>台語文記憶</a>
							</div>
						</div>
					</div>
				</div>
				<div id='feedback'>
					<div id='feedback-text'><Translate id='opinion' /></div>
					<a id='feedback-email' href='mailto:ngoohebi+chhoetaigi@gmail.com'>ngoohebi+chhoetaigi@gmail.com</a>
				</div>
			</div>
		);
	}
}

export default withLocalize(About);