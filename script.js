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
  ExpendParticles()
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
var yVal; 
var accel; 
var velocity; 
var mass; 
let char;

function preload() {
  char = loadImage('img/char/ghost/idle.png');
}

function setup() {
  var myCanvas = createCanvas(windowWidth - 5, windowHeight - 5);
  myCanvas.parent('absCanvas');
  
  yVal = 0;  
  velocity = 0; 
  mass = 100; 
  
  accel = mass * 0.1; 

  // char = new Image();
  // char.src = "img/char/ghost/idle.png";
}

function draw() {
  clear();
  
  velocity += accel; 
  yVal += velocity;
	ellipse(width/2,yVal, mass,mass); 
  
  if (yVal > height - mass/2) {
    // A little dampening when hitting the bottom
    velocity *= -0.6;
    yVal = height - mass/2;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img.elt, 0, 0);

  image(char, 10, yVal);
}


function mousePressed() {
  yVal = 0;  
  velocity = 0; 
}

// --------------------------------------------------------------------
