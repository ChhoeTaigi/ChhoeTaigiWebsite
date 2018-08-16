import React from 'react';

import '../../public/stylesheets/global.css'
import '../../public/stylesheets/about.css'

export const About = () => (
    <div>
		<div id='about-ctg'>關於 ChhoeTaigi</div>
		<div id='brief-container'>
			<div className='fix-width-center'>
				<div id='brief-title'>ChhoeTaigi 簡介</div>
				<ul id='brief-ul'>
					<li className='brief-li'>「ChhoeTaigi 找台語」計畫的目標是為了整理和數位化台語的字詞資料，不只提供公開授權的台語字詞資料庫，也有辭典網站和手機辭典app，方便大家應用和查詢台語的字詞。</li>
					<li className='brief-li'>計畫初期是拿到g0v半年的計畫獎助金，接下來需要靠大家支持和相挺，才能繼續走下去。</li>
				</ul>
				<div id='seeking-for-sponsor'>
					<div id='seeking-for-sponsor-title'>公開徵求贊助</div>
					<ol id='seeking-ol'>
						<li className='seeking-li'>產品營運資金（伺服器成本、維護成本等）</li>
						<li className='seeking-li'>軟體工程師、設計師（維護既有產品或開發相關應用）</li>
						<li className='seeking-li'>台語辭典或字詞資料授權（Creative Commons開放授權）</li>
					</ol>
				</div>
			</div>
		</div>
		<div id='members' className='fix-width-center'>
			<div id='members-title'>團隊成員介紹</div>
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
					<div className='description'>小時候講台語大人還聽得懂，長大後卻被念聽嘸...</div>
				</div>
				<div className='person-card'>
					<img className='profile' src='images/leo.png' width='120' height='120'></img>
					<div className='name'>Leo Wu</div>
					<div className='title'>網頁前後端</div>
					<div className='description'></div>
				</div>
			</div>
		</div>
		<div id='authorization'>
			<div id='authorization-title-container'>
				<div id='authorization-title'>網站資料授權</div>
			</div>
			<div id='authorization-left-bg'></div>
			<div id='authorization-right-bg'></div>
			<div id='authorization-content-center'>
				<div id='authorization-content'>
					<div className='authorization-block' style={{left: '100px'}}>
						<div className='authorization-title'>字詞資料</div>
						<a className='authorization-link' href='#'>ChhoeTaigi 找台語：台語字詞資料庫</a>
					</div>
					<div className='authorization-block' style={{right: '50px'}}>
						<div className='authorization-title'>原書掃描圖片</div>
						<a className='authorization-link' href='#'>台語文記憶</a>
					</div>
				</div>
			</div>
		</div>
		<div id='feedback'>
			<div id='feedback-text'>意見回饋與贊助請來信</div>
			<a id='feedback-email' href='mailto:ngoohebo+chhoetaigi@gmail.com'>ngoohebo+chhoetaigi@gmail.com</a>
		</div>
		<footer>
			<a id='footer-img' href='https://grants.g0v.tw/power/'></a>
		</footer>
	</div>
);