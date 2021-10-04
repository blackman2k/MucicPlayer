const PlayList = [
  {
    index: 0,
    name: "Yêu 5",
    singer: "Rhymastic",
    img: "./asset/img/Yeu 5.jpg",
    file: "asset/music/Yeu 5 - Rhymastic.m4a",
  },
  {
    index: 1,
    name: "Trò Chơi",
    singer: "Soobin",
    img: "asset/img/Tro Choi.jpg",
    file: "asset/music/Tro Choi - Soobin.m4a",
  },
  {
    index: 2,
    name: "The Playah",
    singer: "Soobin",
    img: "asset/img/The Playad.jpg",
    file: "asset/music/The Playah Special Performance_ - Soobin.m4a",
  },
  {
    index: 3,
    name: "Đường Tôi Chở Em Về",
    singer: "Bùi Trường Linh",
    img: "asset/img/Duong Toi Cho Em Ve.jpg",
    file: "asset/music/Duong Toi Cho Em Ve - buitruonglinh.m4a",
  },
  {
    index: 4,
    name: "Đã Lỡ Yêu Em Nhiều",
    singer: "JustaTee",
    img: "asset/img/Da Lo Yeu Em Nhieu.jpg",
    file: "asset/music/Da Lo Yeu Em Nhieu - JustaTee.m4a",
  },
  {
    index: 5,
    name: "Anh Sai Rồi",
    singer: "Sơn Tùng MTP",
    img: "asset/img/Anh Sai Roi.jpg",
    file: "asset/music/Anh Sai Roi - Son Tung M-TP.m4a",
  },
  {
    index: 6,
    name: "Đã Lỡ Yêu Em Nhiều",
    singer: "JustaTee",
    img: "asset/img/Da Lo Yeu Em Nhieu.jpg",
    file: "asset/music/Da Lo Yeu Em Nhieu - JustaTee.m4a",
  },
  {
    index: 7,
    name: "Anh Sai Rồi",
    singer: "Sơn Tùng MTP",
    img: "asset/img/Anh Sai Roi.jpg",
    file: "asset/music/Anh Sai Roi - Son Tung M-TP.m4a",
  }
]

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playList = $('.playlist')
const player = $('.player')
const cdthumb = $('.dashboard .cd')
const audio = $('#audio')
const nameSongPlaying = $('.dashboard header .name-song-play')
const cdthumbImg = $('.dashboard .cd .cd-thumb')
const btnPlay = $('.dashboard .control i[class*="play"]')
const btnPlause = $('.dashboard .control i[class*="pause"]')
const range = $('#range')
const btnBack = $('.dashboard .control i.back')
const btnNext = $('.dashboard .control i.next')
const btnRedo = $('.dashboard .control i.redo')
const btnRandom = $('.dashboard .control i.random')
let songsElement = $$('.playlist .song')

const app = {
  isPlaying: false,
  isRedo: false,
  isRandom: false,
  isScroll: true,
  currentIndex: 0,
  songs: PlayList,
  definedProperties() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },
  render(){
    const htmls = this.songs.map((song)=> {
      return `<div class="song" data-index="${song.index}">
      <div class="song-ava">
          <div class="img cicrle-background" style="background: url('${song.img}') center/ cover no-repeat;"></div>
      </div>
      <div class="song-info">
          <p class="song-name">${song.name}</p>
          <p class="song-singer">${song.singer}</p>
      </div>
      <i class="fas fa-ellipsis-h"></i>
      </div>`
    }).join('')
    playList.innerHTML = htmls
    songsElement = $$('.playlist .song')
    this.loadSong()
  },
  loadSong() {
    range.value = '0'
    nameSongPlaying.innerHTML = this.currentSong.name
    cdthumbImg.style.backgroundImage = `url('${this.currentSong.img}')`
    audio.src = this.currentSong.file
    this.markupSongPlay()
    this.scrollSongIntroView()
  }
  ,
  play() {
    audio.play()
  },
  pause() {
    audio.play()
  },
  nextSong() {
    if(this.currentIndex < this.songs.length - 1) {
      this.currentIndex++
    }
    else {
      this.currentIndex = 0
    }
  },
  backSong() {
    if(this.currentIndex > 0) {
      this.currentIndex--
    }
    else {
      this.currentIndex = this.songs.length - 1
    }
  },
  markupSongPlay() {
    let oldSongsMarkup = $('.playlist .song.playing')
    if(oldSongsMarkup) {
      oldSongsMarkup.classList.remove('playing')
    }
    songsElement[this.currentIndex].classList.add("playing")
  },
  scrollSongIntroView() {
    songsElement[this.currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    })
    if(cdthumb.offsetWidth == 0) {
      let temp = songsElement[app.currentIndex].offsetTop - player.scrollTop
      if( temp < 206) {
        console.log(player.scrollTop)
        app.isScroll = false
        player.scrollTop = 0
        console.log(player.scrollTop)
      }
      app.isScroll = true
    }
  }
  ,
  handleEvents() {
    let _this = this
    //Event scroll player
    let widthCd = cdthumb.offsetWidth
    player.onscroll = (e) => {
      if(app.isScroll) {
        let newWidthCd = widthCd - e.target.scrollTop > 0 ? widthCd - e.target.scrollTop : 0
        cdthumb.style.width = newWidthCd + 'px'
        cdthumb.style.opacity = newWidthCd / widthCd
      }
    }

    //When click play
    audio.onplay = (e) => {
      player.classList.add('playing')
      this.isPlaying = true
    }
    audio.onpause = (e) => {
      player.classList.remove('playing')
      this.isPlaying=false
    }

    btnPlay.onclick = (e) => {
      audio.play()
    }
    btnPlause.onclick = (e) => {
      audio.pause()
    }


    //Progess range
    audio.ontimeupdate = (e) => {
      if(audio.duration){
        range.value = Math.floor(audio.currentTime / audio.duration * 100)
      }
    }

    //When audio ended
    audio.onended = (e) => {
      if(this.isRedo===true) {
        audio.play()
      }
      else {
        _this.nextSong()
        _this.loadSong()
        _this.play()
      }
    }


    //Progress scroll 
    range.oninput = (e) => {
      audio.currentTime = range.value * audio.duration / 100
    }

    //Next song
    btnNext.onclick = (e) => {
      if(app.isRandom===true) {
        app.currentIndex = app.randomIndexSong()
        app.loadSong()
      }
      else {
        app.nextSong()
        app.loadSong()
      }
      app.play()
      cdthumbImg.classList.add('offanimation')
      setTimeout(function() {
        cdthumbImg.classList.remove('offanimation')
      },100)
    }

    //Back song
    btnBack.onclick = (e) => {
      if(app.isRandom===true) {
        app.currentIndex = app.randomIndexSong()
        app.loadSong()
      }
      else{
        app.backSong()
        app.loadSong()
      }
      app.play()
      cdthumbImg.classList.add('offanimation')
      setTimeout(function() {
      cdthumbImg.classList.remove('offanimation')
      },100)
    }

    //Button Redo
    btnRedo.onclick = (e) => {
      app.isRedo = !app.isRedo
      btnRedo.classList.toggle('active', app.isRedo)
    }


    //Button Random 
    btnRandom.onclick = (e) => {
      app.isRandom = !app.isRandom
      btnRandom.classList.toggle('active', app.isRandom)
    }

    //Click change song 
    songsElement.forEach((item, index) => {
      item.onclick = (e) => {
        let song = e.target.closest('.playlist .song')
        if(song&&!e.target.classList.contains('fas')) {
          app.currentIndex = Number(song.getAttribute('data-index'))
          app.loadSong()
          app.play()
        }
      }
    })
  },
  randomIndexSong() {
    let index
    do {
      index = Math.floor(Math.random() * this.songs.length)
    }
    while(index==this.currentIndex)
    return index
  },
  start(){
    this.definedProperties()
    this.render()
    this.handleEvents()
  }
}
app.start()
