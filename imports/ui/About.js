import React from 'react';

export const About = () => (
    <div>
		<div id='introduction-title' className='about-title'>簡介</div>
		<div id='brief-container'>
			<div className='fix-width-center'>
				<ul id='brief-ul'>
					<li className='brief-li'>「ChhoeTaigi 找台語」計畫的目標是為了整理和數位化台語的字詞資料，不只提供公開授權的台語字詞資料庫，也有辭典網站和手機辭典app，希望吸引更多人投入相關研究或開發應用，更幫助一般使用者更便利的查詢台語的字詞資料。</li>
					<li className='brief-li'>此計畫是獲得g0v在2018年上半年所提供的獎助金計畫，才得以開始進行，完成階段性目標，接下來需要靠更多官方和民間的實際支持和相挺，才能繼續長遠的走下去。</li>
				</ul>
			</div>
		</div>
		<div id='feature-container'>
			<div id='feature-title' className='about-title'>特色</div>
			<div className='feature-card-three-columns'>
				<div className='feature-card'>
					<img id='feature-1' src='images/data@2x.png' width='136' height='107'></img>
					<span className='feature-card-title'>資料豐富</span>
					<span className='feature-card-content'>整合10份文獻資料，超過30萬筆台語字詞</span>
				</div>
				<div className='feature-card'>
					<img id='feature-2' src='images/standard@2x.png' width='178' height='99'></img>
					<span className='feature-card-title'>標準化</span>
					<span className='feature-card-content'>格式採歷史最悠久文獻最多的白話字，也提供教育部推行之羅馬字，並同時提供Unicode跟數字輸入格式</span>
				</div>
				<div className='feature-card'>
					<img id='feature-3' src='images/digital@2x.png' width='118' height='94'></img>
					<span className='feature-card-title'>數位化</span>
					<span className='feature-card-content'>字詞資料皆提供CSV格式，公開在GitHub</span>
				</div>
			</div>
			<div className='feature-card-two-columns'>
				<div className='feature-card'>
					<img id='feature-4' src='images/opencc@2x.png' width='129' height='91'></img>
					<span className='feature-card-title'>公開授權</span>
					<span className='feature-card-content'>資料全部採用Creative Commons公開授權</span>
				</div>
				<div className='feature-card'>
					<img id='feature-5' src='images/service@2x.png' width='135' height='93'></img>
					<span className='feature-card-title'>服務化</span>
					<span className='feature-card-content'>提供線上辭典網站及可離線辭典app，方便一次查詢全部台語字詞</span>
				</div>
			</div>
		</div>
		<div id='join-container'>
			<div id='join-title' className='about-title'>加入協作</div>
			<div id='join-box-1' className='join-box'>
				<img src='images/discuss@2x.png' width='180' height='173'></img>
				<div>字詞資料提供建議修改或討論</div>
				<button></button>
				<span>請看下方聯絡方式</span>
			</div>
			<div id='join-box-2' className='join-box'>
				<div>參與開源專案，協助改進產品</div>
				<button>GitHub</button>
				<img src='images/participate@2x.png' width='256' height='150'></img>
			</div>
		</div>
		<div id='seeking-container'>
			<div id='seeking-title' className='about-title'>徵求贊助</div>
			<ol id='seeking-ol'>
				<li>產品營運資金（伺服器成本、維護成本等)</li>
				<li>台語辭典或字詞資料授權（Creative Commons開放授權)</li>
			</ol>
		</div>
		<div id='contact-container'>
			<div id='contact-title' className='about-title'>聯絡方式</div>
			<div id='contact-buttons-container'>
				<a id='contact-button-1' className='contact-button'>
					<span>私訊</span>
					<div></div>
				</a>
				<a id='contact-button-2' className='contact-button'>
					<span>來信</span>
					<div></div>
				</a>
			</div>
		</div>
		<div id='members-container' className='fix-width-center'>
			<div id='members-title' className='about-title'>團隊成員介紹</div>
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
					<div className='authorization-block' style={{right: '62px'}}>
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