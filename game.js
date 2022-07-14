const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        }
    ],
    render: function() {
        const htmls = this.songs.map(function(song) {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
              </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    handleEvent: function() {
        const cdWidth = cd.offsetWidth
        const cdThumAnimate = cdThumb.animate([
            { transform: ' rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity

        })
        console.log(cdThumAnimate)
        cdThumAnimate.pause()

        document.onscroll = function() {
            const scrolltop = window.scrollY || document.documentElement.scrollTop
            const newWidth = cdWidth - scrolltop
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
            cd.style.opacity = newWidth / cdWidth
        }
        playBtn.onclick = function() {
            if (app.isPlaying) {
                // app.isPlaying = false
                audio.pause()
                    // player.classList.remove('playing')
            } else {
                // app.isPlaying = true
                audio.play()
                    // player.classList.add('playing')
            }

        }
        audio.onplay = function() {
            app.isPlaying = true
            player.classList.add('playing')
            cdThumAnimate.play()
        }
        audio.onpause = function() {
            app.isPlaying = false
            player.classList.remove('playing')
            cdThumAnimate.pause()

        }
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        progress.onchange = function(e) {
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
        }
        btnNext.onclick = function() {
            if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.nextSong()

            }
            audio.play()
        }
        btnPrev.onclick = function() {
            if (app.isRandom) {
                app.playRandomSong()
            } else {
                app.prevSong()

            }
            audio.play()
        }
        btnRandom.onclick = function(e) {
            app.isRandom = !app.isRandom
            btnRandom.classList.toggle('active', app.isRandom)
            app.playRandomSong()
        }
        btnRepeat.onclick = function(e) {
            app.isRepeat = !app.isRepeat
            btnRepeat.classList.toggle('active', app.isRepeat)

        }
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play()
            } else {
                btnNext.click()

            }
        }

    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {


        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        console.log(heading, cdThumb, audio)
    },
    nextSong: function() {
        this.currentIndex++

            if (this.currentIndex == this.songs.length) {
                this.currentIndex = 0
            }

        this.loadCurrentSong()
    },
    prevSong: function() {
        if (this.currentIndex == 0) {
            this.currentIndex = this.songs.length
        }

        this.currentIndex--

            this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        this.defineProperties()

        this.handleEvent()

        this.loadCurrentSong()

        this.render()
    }
}
app.start()