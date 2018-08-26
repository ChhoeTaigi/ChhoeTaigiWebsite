import React from 'react';

import '../../public/stylesheets/global.css'
import '../../public/stylesheets/about.css'

export const About = () => (
    <div>
		<div id='about-ctg'>關於 ChhoeTaigi</div>
		<div id='brief-container'>
			<div className='fix-width-center'>
				<div id='brief-title'>ChhoeTaigi 簡介</div>
				<ul id='brief-ul' className='lighter'>
					<li className='brief-li'>「ChhoeTaigi 找台語」計畫的目標是為了整理和數位化台語的字詞資料，不只提供公開授權的台語字詞資料庫，也有辭典網站和手機辭典app，希望吸引更多人投入相關研究或開發應用，更幫助一般使用者更便利的查詢台語的字詞資料。</li>
					<li className='brief-li'>目前已經整理10份的字詞文獻資料，總計超過30萬筆的台語字詞，全部標準化成現在流通使用的白話字、教育部羅馬字的文字系統。除了文字採Unicode格式外，也提供沒有台語輸入法的替代格式方案，方便大家使用和查詢。</li>
					<li className='brief-li'>此計畫是獲得g0v在2018年上半年所提供的獎助金計畫，才得以開始進行，完成階段性目標，接下來需要靠更多官方和民間的實際支持和相挺，才能繼續長遠的走下去。</li>
				</ul>
				<div id='seeking-for-sponsor'>
					<div id='seeking-for-sponsor-title'>公開徵求贊助</div>
					<ol id='seeking-ol' className='lighter'>
						<li className='seeking-li seeking-li-dash'>產品營運資金（伺服器成本、維護成本等）</li>
						<li className='seeking-li seeking-li-dash'>軟體工程師、設計師（維護既有產品或開發相關應用）</li>
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
				<div id='authorization-title'>網站資料授權</div>
			</div>
			<div id='authorization-left-bg'></div>
			<div id='authorization-right-bg'></div>
			<div id='authorization-content-center'>
				<div id='authorization-content'>
					<div className='authorization-block' style={{left: '100px'}}>
						<div className='authorization-title'>字詞資料</div>
						<a className='authorization-link' href='https://github.com/ChhoeTaigi/ChhoeTaigiDatabase' target='_blank'>ChhoeTaigi 找台語：台語字詞資料庫</a>
					</div>
					<div className='authorization-block' style={{right: '50px'}}>
						<div className='authorization-title'>原書掃描圖片</div>
						<a className='authorization-link' href='http://ip194097.ntcu.edu.tw/memory/tgb/MoWT.asp' target='_blank'>台語文記憶</a>
					</div>
				</div>
			</div>
		</div>
		<div id='feedback'>
			<div id='feedback-text'>意見回饋與贊助請來信</div>
			<a id='feedback-email' href='mailto:ngoohebi+chhoetaigi@gmail.com'>ngoohebi+chhoetaigi@gmail.com</a>
		</div>
	</div>
);