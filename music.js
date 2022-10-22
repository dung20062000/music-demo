const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC-PLAYER';


//lấy ra bài hát
const playList = $('.playlist');

const cdThum = $('.cd-thumb');

//lấy ra nut play
const playBtn = $('.btn-toggle-play');
const player = $('.player');

// lấy ra nut next , prev
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

//lấy ra nut ramdom
const randomBtn = $('.btn-random');

// lấy ra nút repeat
const repeatBtn = $('.btn-repeat');







const app = {
  currentIndex: 0,

  isPlaying : false,
  isRamdom : false,
  isRepeat : false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function(key, value){
    this.config[key] =value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Bay Giữa Ngân Hà",
      singer: "Nam Cường",
      path: "./songs_list/Bay Giữa Ngân Hà_Nam Cường_-1073758319.mp3",
      image: "./img_list/Bay Giữa Ngân Hà.jfif"
    },
    {
      name: "Em Biết",
      singer: "Trịnh Đình Quang",
      path: "./songs_list/Em Biết_Trịnh Đình Quang_-1076413853.mp3",
      image:
        "./img_list/Em Biết.jfif"
    },
    {
      name: "Gió Vẫn Hát",
      singer: "Long Phạm",
      path: "./songs_list/Gió Vẫn Hát_Long Phạm_-1079240948.mp3",
      image: "./img_list/Gió Vẫn Hát.jfif"
    },
    {
      name: "Mưa Trong Lòng",
      singer: "Trịnh Đình Quang",
      path: "./songs_list/Mưa Trong Lòng_Trịnh Đình Quang_-1075784817.mp3",
      image:
        "./img_list/Mưa Trong Lòng.jfif"
    },
    {
      name: "Một Bước Yêu Vạn Dặm Đau",
      singer: "Mr Siro",
      path: "./songs_list/Một Bước Yêu Vạn Dặm Đau_Mr Siro_-1079104373.mp3",
      image:
        "./img_list/Một Bước Yêu Vạn Dặm Đau.jfif"
    },
    {
      name: "So Far Away From Home",
      singer: "Globe",
      path: "./songs_list/So Far Away From Home (Beautiful Journey)_Globe_-1073779850.mp3",
      image:
        "./img_list/So Far Away From Home.jfif"
    },
    {
      name: "Thằng Hầu (Remix)",
      singer: "Nhật Phong",
      path: "./songs_list/Thằng Hầu (Remix)_Nhật Phong, DinhLong_-1079249684.mp3",
      image:
        "./img_list/Thằng Hầu.jfif"
    },{
      name: "Tìm Em",
      singer: "Trịnh Đình Quang",
      path: "./songs_list/Tìm Em_Trịnh Đình Quang_-1075170080.mp3",
      image:
        "./img_list/Tìm Em.jfif"
    },
    {
      name: "Yêu Được Không",
      singer: "Đức Phúc",
      path: "./songs_list/Yêu Được Không_Đức Phúc_-1079251433.mp3",
      image:
        "./img_list/Yêu Được Không.jfif"
    },
  ],


  render: function(){
    const htmls = this.songs.map((song, index)=>{
      return`
      <div class="song ${index === this.currentIndex ? 'active' : '' }" data-index = ${index}>
      <div class="thumb" style="background-image: url('${song.image}')">
      </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
      </div>`
    })
    playList.innerHTML = htmls.join('');
  },


  handleEvents: function(){
    const _this = this;
    const cd = $('.cd');
    const cdWidth = cd.offsetWidth;
    
    //sử lí khi cd quay và dừng
    const cdThumAnimate = cdThum.animate([
      {transform :'rotate(360deg)'}
    ],
     {duration: 10000,
      iteration: Infinity
    });
    cdThumAnimate.pause();

    // sử lí phóng to thu nhỏ đia CD
    document.onscroll = function(){
      const scrollTop  = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0; // cdWidth  > 0 thì thực hieennj còn nếu cdWidth < 0  thì cho giá trị của cdWidth = 0
      cd.style.opacity = newCdWidth / cdWidth;  // làm mờ dần đĩa cd 
    };

    // sử lý khi click btn-play
    playBtn.onclick = function() {
      if(_this.isPlaying){
        audio.pause();
      }
      else {
        audio.play();
      };
    };

    //khi bài hát được play 
    audio.onplay = function() {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumAnimate.play();
    };
    //khi bài hát bị pause 
    audio.onpause = function() {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumAnimate.pause();

    };
    //khi tiến độ bài hát được thay đổi
    audio.ontimeupdate = function() { 
      const progress = $('#progress');
      if(audio.duration){
        const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
      progress.value = progressPersent;
      }

    }
    console.log([audio]);

    //sử lý khi tua
    progress.onchange = function(e) {
      const seekTime = audio.duration /100 * e.target.value;
      // console.log(seekTime);
      audio.currentTime = seekTime;
    };

    // xử lí khi chỉnh âm lượng bài hát
    const btnVolume = $('#volume');
    audio.volume = 0.5;
    // btnVolume.onchange = function(e) {
    //   if(audio.volume = 0.5){
    //     btnVolume.value = 0.5;
    //   }
    // };


    //khi ấn nút  nexBtn
    nextBtn.onclick = function() {
      if(_this.isRamdom) {
        _this.playRandomSong();
      }else{
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //khi ấn nút  prevBtn
    prevBtn.onclick = function() {
      if(_this.isRamdom) {
        _this.playRandomSong();
      }else{
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();

    };

    //khi ấn nút ramdom
    randomBtn.onclick = function() {
      _this.isRamdom = !_this.isRamdom;

      //lưu option lựa chọn tước đây
      _this.setConfig('isRamdom', _this.isRamdom);


      randomBtn.classList.toggle('active', _this.isRamdom);
    };
    // sử lý khi bài hát kết thúc ended 
    audio.onended = function() {
      if(_this.isRepeat) {
        audio.play();
      }else{
        nextBtn.click();
      }
    };

    // xử lí nút repeat 
    repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat;

      //lưu option lựa chọn tước đây
      _this.setConfig('isRepeat', _this.isRepeat);


      repeatBtn.classList.toggle('active', _this.isRepeat);
    };

    // lắng nghe hành vi click vào playList
    playList.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)');
      const songOption = e.target.closest('.option');
      // sử lí khi click vào bài hát 
      if( songNode || e.target.closest('.option')){
        if(songNode){
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        } 
        // xử lí khi click vào option 
        if(songOption){

        }
        
      }
    }
  },
  // bài hát được active hiện tại hiển thị ra view
  scrollToActiveSong : function(){
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior:'smooth',
        block: 'center',
      });
    }, 300)
  },
  loadConfig: function(){
    this.isRamdom = this.config.isRamdom;
    this.isRepeat = this.config.isRepeat;

    // hiển thị trạng thái ban đầu của Btn repeat và btn randum
    randomBtn.classList.toggle('active', this.isRamdom);
    repeatBtn.classList.toggle('active', this.isRepeat);
  },


  loadCurrentSong: function(){
    const heading = $('header h2');
    const audio = $('#audio');

    // console.log(heading, cdThum, audio);
    heading.textContent = this.currentSong.name;
    cdThum.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
   
  },



  defineProperties : function(){
    Object.defineProperty(this, 'currentSong', {
      get: function(){
        return this.songs[this.currentIndex];
      }
    })
  },
  nextSong : function(){  
    this.currentIndex++
    if(this.currentIndex >= this.songs.length){
      this.currentIndex =0;
    }
    this.loadCurrentSong();
  },

  prevSong : function(){  
    this.currentIndex--
    if(this.currentIndex < 0 ){
      this.currentIndex = this.songs.length - 1; 
    }
    this.loadCurrentSong();
  },

  playRandomSong : function(){
    let newIndex
    do{
      newIndex = Math.floor(Math.random() * this.songs.length);
    }
    while(newIndex === this.currentIndex)
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start :function(){

    //gán cấu hình từ config vào ứng dựng
    this.loadConfig();
    
    //dịnh nghĩa các thuộc  tính cho obj 
    this.defineProperties();

    //lắng nghe và sư lí các sự kiện 
    this.handleEvents();

    // tải bài hát dầu tiên vào ứng dụng khi load trang 
    this.loadCurrentSong();

    //render playList
    this.render();
  },

}
app.start();
