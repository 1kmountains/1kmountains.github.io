const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
console.log(window.innerWidth)
let particleDist = window.innerHeight / 180
let particleRefImgSize = 80
let adjustX = canvas.width / (particleDist * 2) - particleRefImgSize / 2
let adjustY = canvas.height / (particleDist * 2) - particleRefImgSize / 2
//  - canvas.height/(particleDist*2)/5

const mouse = {
  x: null,
  y: null,
  radius: 120,
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('click', (event) => {
  ExpendParticles();
  const newChar =  new Character();
  chars.push(newChar);
})

window.addEventListener('resize', (event) => {
  resize()
})

var img = new Image()
img.onload = doSomething
function doSomething() {
  ctx.drawImage(img, 0, 0, particleRefImgSize, particleRefImgSize)
  init()
}

img.src =
  'data:image/png;base64,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'
class Particle {
  constructor(x, y, _x, _y, col) {
    this._x = _x
    this._y = _y
    this.size = 1.5
    this.col = col
    this.defaultCol = col
    this.baseX = x
    this.baseY = y

    const k = canvas.width / 2
    const z = canvas.height / 2

    this.x = k
    this.y = z
    this.density = Math.random() * 8 + 4
    this.speed = Math.random() * 6 + 2
  }

  draw() {
    ctx.fillStyle =
      'rgb(' +
      this.col.r +
      ',' +
      this.col.g +
      ',' +
      this.col.b +
      ',' +
      this.col.a +
      ')'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update() {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const forceDirectionX = dx / distance
    const forceDirectionY = dy / distance
    const maxDistance = mouse.radius
    const force = ((maxDistance - distance) / maxDistance) * 0.45
    const directionX = forceDirectionX * force * this.density
    const directionY = forceDirectionY * force * this.density
    const tmpColor = {}
    tmpColor.r = 255
    tmpColor.g = 207
    tmpColor.b = 0
    tmpColor.a = this.col.a
    if (distance < mouse.radius) {
      // this.col = lerpRGB(this.col, tmpColor, 1 - distance/mouse.radius);
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX
        this.x -= (dx / 30) * this.speed
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY
        this.y -= (dy / 30) * this.speed
      }
      // this.col = lerpRGB(this.col, this.defaultCol, (this.x + this.y) / (this.baseX + this.baseY));
    }
  }
}

var rainParticles = []
window.addEventListener('load', function () {
  var count = 80
  var createdObj = 0

  function RainParticles() {
    this.dropeds = []
    this.x = Math.random() * window.innerWidth
    this.y = -(Math.random() * 1000 + 100)
    this.width = Math.floor(Math.random() * 1.25 + 0.25)
    this.height = Math.floor(Math.random() * 80 + 10)

    this.speed = Math.random() * 8 + 5

    this.Droped = function (x, y) {
      createdObj = 1
      this.x = x
      this.y = y
      this.radius = 1
      this.speed = Math.random() * 8 + 5
      this.angle = Math.PI * (Math.random() * 2)

      this.plump = function () {
        if (this.radius > 30) this.radius = 1000
        this.radius += this.speed
        this.fx = this.radius * Math.cos(this.angle) + this.x
        this.fy = this.radius * Math.sin(this.angle) + this.y
      }
    }
  }

  RainParticles.prototype.drop = function () {
    if (this.y > window.innerHeight) this.y = -(Math.random() * 1000 + 100)
    this.y += this.speed
    ctx.fillStyle = '#7e7e7e'
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.closePath()
    ctx.fill()
  }

  for (var i = 0; i < count; i++) {
    rainParticles[i] = new RainParticles()
  }
  function animate() {
    for (var i = 0; i < rainParticles.length; i++) {
      rainParticles[i].drop()
    }
    requestAnimationFrame(animate)
  }
  animate()
})

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  particleDist = window.window.innerHeight / 180
  adjustX = canvas.width / (particleDist * 2) - particleRefImgSize / 2
  adjustY = canvas.height / (particleDist * 2) - particleRefImgSize / 2

  //  - canvas.height/(particleDist*2)/5
  particles.forEach((x) => {
    x.baseX = (x._x + adjustX) * particleDist
    x.baseY = (x._y + adjustY) * particleDist
  })
  rainParticles.forEach((x) => {
    x.x = Math.random() * window.innerWidth
  })
}

function ExpendParticles() {
  particles.forEach((x) => {
    x.x = randomNumber(0, canvas.width)
    x.y = randomNumber(0, canvas.height)
  })
}

function lerpRGB(color1, color2, t) {
  let color = {}
  color.r = color1.r + (color2.r - color1.r) * t
  color.g = color1.g + (color2.g - color1.g) * t
  color.b = color1.b + (color2.b - color1.b) * t
  color.a = color1.a + (color2.a - color1.a) * t
  return color
}

function init() {
  const textCoordinates = ctx.getImageData(
    0,
    0,
    particleRefImgSize,
    particleRefImgSize,
  )
  particles = []
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 0) {
        const positionX = x + adjustX
        const positionY = y + adjustY
        // const myColor = "rgba(" + textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 0] + ", " + textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 1] + ", " + textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 2] + ", " + textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] + ")";

        const myColor = {}
        myColor.r =
          textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 0]
        myColor.g =
          textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 1]
        myColor.b =
          textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 2]
        myColor.a =
          textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3]

        particles.push(
          new Particle(
            positionX * particleDist,
            positionY * particleDist,
            x,
            y,
            myColor,
          ),
        )
      }
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw()
    particles[i].update()
  }
  connect()
  requestAnimationFrame(animate)
}
animate()

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < particleDist * 1.6) {
        ctx.strokeStyle =
          'rgb(' +
          particles[i].col.r +
          ',' +
          particles[i].col.g +
          ',' +
          particles[i].col.b +
          ',' +
          particles[i].col.a +
          ')'
        ctx.lineWidth = 0.3
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}

// initiate full page scroll
$('#fullpage').fullpage({
  scrollBar: true,
  responsiveWidth: 400,
  navigation: true,
  navigationTooltips: ['cover', 'about', 'portfolio', 'contact', 'connect'],
  anchors: ['home', 'about', 'portfolio', 'contact', 'connect'],
  menu: '#myMenu',
  fitToSection: false,

  afterLoad: function (anchorLink, index) {
    var loadedSection = $(this)

    //using index
    // if (index == 1) {
    //   /* add opacity to arrow */
    //   $(".fa-chevron-down").each(function () {
    //     $(this).css("opacity", "1");
    //   });
    //   $(".header-links a").each(function () {
    //     $(this).css("color", "white");
    //   });
    //   $(".header-links").css("background-color", "transparent");
    // } else if (index != 1) {
    //   $(".header-links a").each(function () {
    //     $(this).css("color", "black");
    //   });
    //   $(".header-links").css("background-color", "white");
    // }

    // using index
    if (index == 2) {
      /* animate skill bars */
      new WOW().init();
    }
  },
})

//Mouse
$(document).on('mousemove', function (e) {
  $('.cursor, .follower').css({
    transform: 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0px)',
  })
  // $('.cursor, .follower').css({'mix-blend-mode': 'difference'})
  // $('.follower-circle').addClass('follower-circle--scale');
})

new WOW().init()


// simple gravity



// P5JS -----------------------------------------------------------
var char_Ghost1 = new Image();


function setup() {
  var myCanvas = createCanvas(windowWidth - 5, windowHeight - 5);
  myCanvas.parent('absCanvas');
  
  yVal = 0;  
  velocity = 0; 
  mass = 110; 
  
  accel = mass * 0.05; 

  // char = new Image();
  }


  let chars = [];

  class Character {
    constructor(index) {
      this.MyImage = new Image();
      this.state = "idle",
      this.y = 0;
      this.x = randomNumber(10, windowWidth - 10);
      this.mass = 110;
      this.velocity = 0;
      this.accel = mass * 0.05;
      this.frames = 4;

      // hidden code
      this.idle1 = loadImage("data:image/png;base64,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");
      //endregion
    }
  }

  function draw() {
  clear();

  for (let char of chars) {
    char.velocity += char.accel; 
    char.y += char.velocity;
  
    if (char.y > height - char.mass/2) {
    // A little dampening when hitting the bottom
      char.velocity *= -0.6;
      char.y = height - char.mass/2;
    }

    image(char.idle1, char.x, char.y, 60, 60);
  }
}


function mousePressed() {
  // const newChar =  new Character();
  // chars.push(newChar);
}

// --------------------------------------------------------------------
