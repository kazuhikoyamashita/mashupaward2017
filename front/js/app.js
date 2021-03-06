(function() {
	console.log(axios);
	let canvas = document.getElementById('mycanvas');
	let ctx = canvas.getContext('2d');
	let roadBinaryData;
	window.onload = function(){
		if ( checkFileApi() && checkCanvas(canvas) ){
			//ファイル選択
			let file_image = document.getElementsByClassName('js-file-image')[0];
			file_image.addEventListener('change', selectReadfile, false);
			let rotateBtn = document.getElementById('js-rotate-btn');
			rotateBtn.addEventListener('click', drawRotate, false);
			let submitBtn = document.getElementById('js-submit-btn');
			submitBtn.addEventListener('click', postFile, false);
		}
	};
	//canvas に対応しているか
	function checkCanvas(canvas){
		if (canvas && canvas.getContext){
			return true;
		}
		alert('Not Supported Canvas.');
		return false;
	}
	// FileAPIに対応しているか
	function checkFileApi() {
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			// Great success! All the File APIs are supported.
			return true;
		}
		alert('The File APIs are not fully  in this browser.');
		return false;
	}
	//端末がモバイルか
	let _ua = (function(u){
		let mobile = {
			0: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
			|| u.indexOf("iphone") != -1
			|| u.indexOf("ipod") != -1
			|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
			|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
			|| u.indexOf("blackberry") != -1,
			iPhone: (u.indexOf("iphone") != -1),
			Android: (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
		};
		let tablet = (u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
			|| u.indexOf("ipad") != -1
			|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
			|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
			|| u.indexOf("kindle") != -1
			|| u.indexOf("silk") != -1
			|| u.indexOf("playbook") != -1;
		let pc = !mobile[0] && !tablet;
		return {
			Mobile: mobile,
			Tablet: tablet,
			PC: pc
		};
	})(window.navigator.userAgent.toLowerCase());
	//ファイルが選択されたら読み込む
	function selectReadfile(e) {
		let file = e.target.files;
		let reader = new FileReader();
		//dataURL形式でファイルを読み込む
		reader.readAsDataURL(file[0]);
		//ファイルの読込が終了した時の処理
		reader.onload = function(){
			roadBinaryData = reader.result;
			readDrawImg(reader, canvas, 0, 0);
		}
	}
	function readDrawImg(reader, canvas, x, y){
		let img = readImg(reader);
		img.onload = function(){
			let w = img.width;
			let h = img.height;
			// モバイルであればリサイズ/2
			if(_ua.Mobile[0]){
				let resize = resizeWidthHeight(1024, w, h);
				drawImgOnCav(canvas, img, x, y, resize.w/2, resize.h/2);
			}else{
				// モバイル以外では元サイズ/2
				drawImgOnCav(canvas, img, x, y, w/2, h/2);
			}
		}
	}
	//ファイルの読込が終了した時の処理
	function readImg(reader){
		//ファイル読み取り後の処理
		let result_dataURL = reader.result;
		let img = new Image();
		img.src = result_dataURL;
		return img;
	}
	//キャンバスにImageを表示
	function drawImgOnCav(canvas, img, x, y, w, h) {
		canvas.width = w;
		canvas.height = h;
		ctx.drawImage(img, x, y, w, h);
	}
	// リサイズ後のwidth, heightを求める
	function resizeWidthHeight(target_length_px, w0, h0){
		//リサイズの必要がなければ元のwidth, heightを返す
		let length = Math.max(w0, h0);
		if(length <= target_length_px){
			return{
				flag: false,
				w: w0,
				h: h0
			};
		}
		//リサイズの計算
		let w1;
		let h1;
		if(w0 >= h0){
			w1 = target_length_px;
			h1 = h0 * target_length_px / w0;
		}else{
			w1 = w0 * target_length_px / h0;
			h1 = target_length_px;
		}
		return {
			flag: true,
			w: parseInt(w1),
			h: parseInt(h1)
		};
	}
	function drawRotate() {
		console.log(ctx);
		ctx.rotate(90/180*Math.PI);
	}
	function printWidthHeight( width_height_id, flag, w, h) {
		let wh = document.getElementById(width_height_id);
		if(!flag){
			wh.innerHTML = "なし";
			return;
		}
		wh.innerHTML = 'width:' + w + ' height:' + h;
	}
	function postFile() {
		axios.post('', {
			fileBinaryData: roadBinaryData,
			longitude: '35.710277',
			latitude: '139.777208'
		})
			.then(function (response) {
				let data = [
					{
						area: '東京',
						name: '◯◯温泉',
						url: 'https://liginc.co.jp/',
						address: '東京都千代田区'
					},
					{
						area: '東京',
						name: '✕✕温泉',
						url: 'https://liginc.co.jp/',
						address: '東京都千代田区'
					},
					{
						area: '東京',
						name: '□□温泉',
						url: 'https://liginc.co.jp/',
						address: '東京都千代田区'
					},
					{
						area: '東京',
						name: '△△温泉',
						url: 'https://liginc.co.jp/',
						address: '東京都千代田区'
					}
				];

				let $table = document.querySelector('.js-table');

				for (let i = 0; i < data.length; i++){
					let tr = document.createElement('tr');
					$table.appendChild(tr);
					for(let key in data[i]){
						let td = document.createElement('td');
						//if(data[i][key] === 'url') {
						//	td.innerHTML = `<a href="${data[i][key]}"></a>`;
						//} else {
							td.innerHTML = data[i][key];
						//}
						$table.appendChild(td);
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
})();