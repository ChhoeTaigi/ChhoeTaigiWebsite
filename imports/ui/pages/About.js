import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import aboutTranslations from '../../translations/about.json';

class About extends Component {
	constructor(props) {
		super(props);

		props.addTranslation(aboutTranslations);

		this.state = {
			contactRef: React.createRef(),
		};
	}

	componentDidMount() {
        window.scrollTo(0, 0);
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
							<li className='brief-li'>
								<div className="brief_support_taibun_kesimi">
                        			<label className="brief_support_taibun_kesimi_part1_label"><Translate id="support_taibun_kesimi_part1" /></label>
                        			<a className="brief_support_taibun_kesimi_part2_a" target="_blank" href="https://www.zeczec.com/projects/taibun-kesimi"><Translate id="support_taibun_kesimi_part2" /></a>
                       				<label className="brief_support_taibun_kesimi_part3_label"><Translate id="support_taibun_kesimi_part3" /></label>
                    			</div>
							</li>
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
							<span className='feature-card-title'><Translate id='feature-title-2' /></span>
							<span className='feature-card-content'><Translate id='feature-content-2' /></span>
						</div>
						<div className='feature-card'>
							<img id='feature-3' src='images/digital@2x.png' width='118' height='94'></img>
							<span className='feature-card-title'><Translate id='feature-title-3' /></span>
							<span className='feature-card-content'><Translate id='feature-content-3' /></span>
						</div>
					</div>
					<div className='feature-card-two-columns'>
						<div className='feature-card'>
							<img id='feature-4' src='images/opencc@2x.png' width='129' height='91'></img>
							<span className='feature-card-title'><Translate id='feature-title-4' /></span>
							<span className='feature-card-content'><Translate id='feature-content-4' /></span>
						</div>
						<div className='feature-card'>
							<img id='feature-5' src='images/service@2x.png' width='135' height='93'></img>
							<span className='feature-card-title'><Translate id='feature-title-5' /></span>
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
					{/* <ol id='seeking-ol'>
						<li><Translate id='sponsor-1' /></li>
						<li><Translate id='sponsor-2' /></li>
					</ol> */}
					<div>
						<a href="https://www.zeczec.com/projects/taibun-kesimi" target="_blank">
                        	<img src='https://s3-ap-northeast-1.amazonaws.com/zeczec-prod/asset_168448_image_big.jpg?1586176499' width='800' height='290' />    
                    	</a>
					</div>
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
							<img className='profile' src='images/teammember_hebi.png' width='120' height='120'></img>
							<div className='name'>Hê-bí</div>
							<div className='title'>Sàu thô͘-kha kiam kòng cheng.</div>
							<div className='description'>Khiàn-phang ēng--ê. Lâi chú 1 tiáⁿ phang-kòng-kòng ê Tâi-gí moâi.</div>
						</div>
						<div className='person-card'>
							<img className='profile' src='images/teammember_itbin.png' width='120' height='120'></img>
							<div className='name'>I̍tBîn·BuLùSuh</div>
							<div className='title'>Kò͘ tōa-iā ê cha̍p-chhe-á</div>
							<div className='description'>Ǹg-bāng chhiâⁿ-chòe Tâi-gí ê hó kang-lâng kap sim-lêng-siōng ê a-sià.</div>
						</div>
						<div className='person-card'>
							<img className='profile' src='images/teammember_buncheng.png' width='120' height='120'></img>
							<div className='name'>BûnCheng</div>
							<div className='title'>Iau-pá-chhá</div>
							<div className='description'>Tâi-oân-lâng. Tâi-gí. To̍k-li̍p Kiàn-kok.</div>
						</div>
					</div>
					<div className='person-card-three-columns'>
						<div className='person-card'>
							<img className='profile' src='images/teammember_hoanteng.png' width='120' height='120'></img>
							<div className='name'>Hoàn-têng</div>
							<div className='title'>Chò sóaⁿ-kang--ê</div>
							<div className='description'>Tâi-oân-lâng ài chai-iáⁿ ka-tī ê le̍k-sú kap bûn-hòa. Ǹg-bāng ta̍k-ke chò-hóe lâi phah-piàⁿ.</div>
						</div>
					</div>
				</div>
				<div id='former-members-container' className='fix-width-center'>
					<div id='members-title' className='about-title'><Translate id='former-members' /></div>
					<div className='former-person-card-five-columns'>
						<div className='person-card-small'>
							<img className='profile-small' src='images/teammember_leo.png' width='100' height='100'></img>
							<div className='name-small'>Leo Wu</div>
							<div className='title-small'>網頁前後端</div>
							<div className='description-small'>台語用羅馬字拼音更有趣</div>
						</div>
						<div className='person-card-small'>
							<img className='profile-small' src='images/teammember_eyes.png' width='100' height='100'></img>
							<div className='name-small'>Eyes</div>
							<div className='title-small'>網頁設計</div>
							<div className='description-small'>小時候講台語大人還聽得懂，長大後卻被唸聽無(Thiaⁿ bô)...</div>
						</div>
						<div className='person-card-small'>
							<img className='profile-small' src='images/teammember_titeng.png' width='100' height='100'></img>
							<div className='name-small'>Tìtêng</div>
							<div className='title-small'>Hū-chek kiò ta̍k-ke hun-thâu mài loān-tàn</div>
							<div className='description-small'>Jîn-seng chhiūⁿ tàu-tô͘, tàu chı̍t-pak chhit-chhái ê Tâi-gí tô͘.</div>
						</div>
						<div className='person-card-small'>
							<img className='profile-small' src='images/teammember_hoanteng.png' width='100' height='100'></img>
							<div className='name-small'>A'ióng</div>
							<div className='title-small'>阿勇台語 A'ióng Tâi-gí</div>
							<div className='description-small'>Bí-kok lâi ê Tâi-oân sin-chū-bîn. Nńg-thé kang-têng-su. Ū-êng teh chhui-sak Tâi-gí.</div>
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
							<div className='authorization-block-left'>
								<div className='authorization-title'><Translate id='authorization-1' /></div>
									<div><a className='authorization-link' href='https://github.com/ChhoeTaigi/ChhoeTaigiDatabase' target='_blank'>ChhoeTaigi 找台語：台語字詞資料庫</a></div>
									<div><a className='authorization-link' href='https://www.pcstore.com.tw/haiang/M19279123.htm' target='_blank'>TJ台語白話小詞典</a>（索引）：<a className='authorization-link' href='http://www.atsiu.com/' target='_blank'>亞細亞國際傳播社</a></div>
							</div>
							<div className='authorization-block-right'>
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