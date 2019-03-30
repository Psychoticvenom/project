var hunterFSM = function (mesh, text){
  
  var timer;
  
  var fsm = StateMachine.create({

    events: [
		{ name: 'start',     from: 'none',      to: 'stand'  },
		{ name: 'found',     from: 'stand',     to: 'seek'   },
		{ name: 'found',     from: 'search',    to: 'seek'   },
		{ name: 'found',     from: 'patrol',    to: 'seek'   },
		{ name: 'proximity', from: 'stand',     to: 'search' },
		{ name: 'proximity', from: 'patrol',    to: 'search' },
		{ name: 'stood',     from: 'stand',     to: 'patrol' },
		{ name: 'patrolled', from: 'patrol',    to: 'stand'  },
		{ name: 'lost',      from: 'seek',      to: 'search' },
		{ name: 'nfound',    from: 'search',    to: 'stand'  },
		{ name: 'caught',    from: 'seek',      to: 'catch'  }
	],

    callbacks: {
		onbeforestart:      function(event, from, to) { },
		onstart:            function(event, from, to) { },

		onbeforefound:      function(event, from, to) { },
		onbeforeproximity:  function(event, from, to) { },
		onbeforestood:      function(event, from, to) { },
		onbeforepatrolled:  function(event, from, to) { },
		onbeforelost:       function(event, from, to) { },
		onbeforenfound:     function(event, from, to) { },
		onbeforecaught:     function(event, from, to) { },

		onfound:            function(event, from, to) { 
			//視線捕捉到玩家(更改State至Seek)
		},
		onproximity:        function(event, from, to) {
			//聽力範圍接觸到玩家(更改State至Search)
		},
		onstood:          function(event, from, to) {
			//經過一段時間後(兩秒)，開始巡邏(更改State至Patrol)
		},
		onpatrolled:        function(event, from, to) {
			//巡邏一段時間後(五秒)，回到站立狀態(更改State至Stand)
		},
		onlost:             function(event, from, to) {
			//追丟玩家(更改State至Search)
		},
		onnfound:           function(event, from, to) {
			//搜尋過後，沒發現玩家(更改State至Stand)
		},
		oncaught:          function(event, from, to) {
			//抓到玩家(更改State至Catch)
		},

		onleavestand:       function(event, from, to) { },
		onleavesearch:      function(event, from, to) { },
		onleaveseek:        function(event, from, to) { },
		onleavepatrol:      function(event, from, to) { },

		onstand:            function(event, from, to) {
		
			var textarea = $('#messages').append("獵人正在原地休息中\n");
			textarea.scrollTop(textarea[0].scrollHeight - textarea.height());
			
			//站定點（放慢速）觀察
			//每兩秒轉換成patrol狀態
			text.text = "Hunter : Stand";
		
			clearTimeout(timer);

			timer = setTimeout (function() {
				fsm.stood();
			},2000);
			
			HCount = 0;
			baseH = 0;
		},
		onsearch:           function(event, from, to) {
		
			//原地旋轉尋找玩家
			text.text = "Hunter : Search";
		
			clearTimeout(timer);
			
			// music 0.5.7 ?
			alertSound.pause();
		},
		onseek:             function(event, from, to) {
			
			//追逐玩家
			text.text = "Hunter : Seek" ;
		
			clearTimeout(timer);
			
			// music 0.5.7 ?
			alertSound.play();
		},
		onpatrol:           function(event, from, to) {
		
			var textarea = $('#messages').append("獵人開始巡邏\n");
			textarea.scrollTop(textarea[0].scrollHeight - textarea.height());
			
			//隨機給予一個target使獵人往那方向行走
			//每八秒回到stand狀態
			text.text = "Hunter : Patrol" ;
			
			clearTimeout(timer);
			timer = setTimeout (function() {
				fsm.patrolled();
			},8000);
		},
		oncatch:            function(event, from, to) { 
		
			//遊戲結束
			text.text = "Hunter : Catch";
		
			clearTimeout(timer);
			
			// music 0.5.7 ?
			alertSound.pause();
			soundTrack.pause();
		}
    }
  });

  fsm.start();
  return fsm;
}
