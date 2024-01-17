const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
console.log(window.innerWidth)
let particleDist = window.innerHeight / 180 * 2
let particleRefImgSize = 40
let particlesLink = 1.4
let adjustX = canvas.width / (particleDist * 2) - particleRefImgSize / 2
let adjustY = canvas.height / (particleDist * 2) - particleRefImgSize / 2
//  - canvas.height/(particleDist*2)/5

let bFirstPage = true;

window.addEventListener("load", (event) => {
    $(".loading-page").fadeOut();
    ExpendParticles();
    fullpage_api.setAllowScrolling(true);
});

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
    if (!isDragging) {
        const newChar = new Character();
        chars.push(newChar);
    }
    else {
        isDragging = false;
    }
})

window.addEventListener('resize', (event) => {
    MyWindowResized();
    p5jsWindowResized();
})


function windowResized() {
    p5jsWindowResized();
}

var img = new Image()
img.onload = doSomething
function doSomething() {
    ctx.drawImage(img, 0, 0, particleRefImgSize, particleRefImgSize)
    initCover();
}

img.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAnnSURBVHgB7VpLaxRZFL4V32IGV46d2fTG/IG4cCGS/SQjIsp0cKNOugdEhMSNbuxZipMRwU0iunATEdRFsgiimBHxRYRkoxlHdNzEGQRfQYyP7ppzKudUvqp00lX9MLdn6kBRlUr1rVtffed855xbxiT23zHXddebBrMmY5dtNA1mtgG4utFYaBuAbGnTQGYjgN+aBjIbAUyZBjIbAWwoIbEOwGKx2FBCYhWAnz9/ZgDNp0+fGoaFVgFIwHkAEgPTpkFsubHMBMDEhasxAjFtGsSsA/DLly/MwNWvX79uCBbayECX3bhQKDSEkFipwrytWLEiYWBcYwDJhR1hYNo0gFmnwmbWhR2Kg4kLV2LKQE5lWEyM5WZjKedvU1NTaWO5WeXCXIk4juMdNzU1uY2QUFtZici+IeKgtWmM8daY7K+JrY2BIibrnz17ZrWQWFuJABOtdmNr0xgjQNLfVgNolYhwDGQVFgBZjhnEBMA4xt0YNVZisrSx2KxUYTbau7znXNBmIbFSRJiFEgu9ODgzM2OtG9u4JqKxz1dimxeZ6gbgw4cPU48ePWo1MY3Zh+AJC6sCkMJAu6mT1Q1Aimc5Yk4+5m8UMAcT6mpSGQKPv3T4tV4g1gXAW7dutdCEO+hw08TERMbENFViTKZv3LhRqZDkzGxZ2Etbs6mx1QXANWvWHJOuMjMpS4BGmjiqsLiyJtVmw4YNsTszNF47v0hhcurjx4+xX2Y5qzmA9+/f76RJt0lTlEH4hgCNPPFQJeLqfnp6Om1iGuWQPfQSvTFpz+qeef/+fU0/XqoHA7t50vzQsi8SkNmxsbGoE3ehmeDv4woJpT6ddP8WAZC9gbdmiss5U0OrKYC3b9/O0SS/E/Y5wkBHgMxHGYOvlxjoIogmxneDwrJuHkcXqmCxquPly5dtpkZWMwCZYQTYT1pBYCoiQG6+e/fuohPnPFDB03xQNn7wODEwR+O0CGCeF0hybuRc1tTIagbghw8fctJFVtcNd5cZiN4oY4V6gprarCYlLuvGzD66tkNintEYyGMoiMTKtufPn3eYGlhNALx582aKXYMxAtf1mKfxUKz13r17iwoKgO7vhY1sZQEkcHpROCT2YUzVOfVOTk5WndbUBECa0ACCxXsEEWMhPUDnYmPpQ6oSYxws97nHq1evmHnt8ntXYp8CiGLCQDeTSv9oqrSqAbx27RrnWSkAyt8roGautn2xatWqBd1YAr6f/1FM9OKgAlLuqy26Xw5c1QH2KXBuCMQuLjlNFVYVgJwgc6IsrFOQfBdmAxWeWrt2bXbz5s0vyo0bip/+OIstc5KyZuk+KYx3CGAJEF1Ja/KmCqsKQEpuM/RQLfJwDrBOGaPHf9M6by4GePhbBxi46sqVK/NAZOGQGOxC/umG2MeM45epsVFDSlu57GAxqxjAkZERpn4WH1iEQt1Wmfh45cqVXdu2bSsLHruwkRQm1Fj1z9FY6fDv3r17x+xr0RCgeR9tyDZkn6OslJcTKTsoZRUDyN0WZRsKBQgGP/RjKuNyW7dunY46Lsc9SGP8eKiA0v//wuvJdVM0l069FoUDFRiB03wTPKZ1dHS0ojq5IgDJjbhI/15Zp+6gm4D4J+eGccADQ+FBEH/fsWPHG7yQ3LcPczxmnTJNXHaeO+u48pJVpHJRmx5oFS0qcZEOuZkD5xW8P2hSP2/fvj0WeMwMNn44ipm+G5tZMN/SuXG8/unTp510fpOGDen++MotqZWrKZZ4il7nMVLP0fXr6P5cofSZGBabgZcvX+a0pSWUKPsKR9vjSsBTk3jqhDvTBN5omH10f25cOMw0TVuUeRgClInMTj7mWInzFrDZMhLbI1ssBg4ODjJwWQYOvqIys1WaMcuWLRum3W+Vgifrwt7AAponRrS93blzZ4B9T548yUq3xRcYZZz8rR9q+uyjfZModaDzjXGbLG9mm7CRLBaAy5cv72b28bGA6IqbOQTeEAH3i6nSRHW9MTVM0ION4DWc/BJrsuiGENcwG0DX5vNFPpYxHbjegX3bxYsX23bv3v3ARLDIAF66dClFMaKTQeMbEWDeG2TC0DZM7lU1eGrKDGH3eFdX1yT+n+6XRcFCYdCMgF0agZX/OSByeuwqG+F/x+g2P0SZa+QYSIraW5wr7B15g/x2h3ft2pU3NTD8yJyNx6c2/Chewyt9dE2HxkjM84pQ/0J8cwrBzkxJtYZODe9bzp8/H6nlFQlAGozVrh2EwpX21HAmk8mb2hrGqIm9e/cGhIMA7YMqolSS7AMSygU90BT08FYIdm54nzl79mzZtCaSC3MDkt3Jf8JZ0biwZ8+eWJIfxXRFjtz0Ld13FP83Pj7OGcBGFAF0S0zsi8HlUQddWONiieuwEdLMcdaUSWvKMvDcuXM8CHZb+GYD9QBPv0yQBxhH9nHHm18kdFkcZA+mJlh1AAtdrUDA3fE6B11cwMycOnVq0Tp5UQYShXl91+/fidue2bdv34Cpo9Hk3+zfv380dK5LGhcBpiywzWOYqK9/DAo8j7EgJnyOCbRgWtNU5kE4bUnpmzF1Bk+/TOCkGc8L+zIh9gTKs3C7qgh9QRSckOiEGesiiyUhbztx4kT7QnNeEMD+/n6vRaRvlE4N1Jt5bDTpf8h1A0kzCUcOqwZxY/+Bxf1crEK0+ggJTKBqCanyvC6NlH289Rw/frykoCzowjRAH9ejHHhpP9Dd3V138NioY30B/6al0g55kV7ahN1uEAXvGN1Va17IC9Et/TCAosL30/RM8kOuXHhFj0MHd2vmYVCSgadPn+YVq1a5SX8ul/sq4E1NTU2G0xZeCMf0Cdr+gdQDWBZo6WNuGRYVrLe1VoYxm+i3LoSNzNGjR+fVySUZSD/IccVBzDtz4MCBrwIeWz6fn8G/r1+/nuEYDOxzwnWsMkrZhilNmH16bGSxyoREpQiNXAYTsg7eswtz4/UwznFZ+CFItrlZ0E6Dnjl06NBXAy9sV69ebaEXeIQmvg5A8WNZcW7d2FdOTUVQpRG8wlwHBlf6Aq6sLwvHAqamt2zZ8uDOnTt+dz3AwJMnT3pFOrFvoKenZ8nAY6OH8haJinOLUqZU0symIlKcKzW1WtLrnHDCXCLhxu6MA/3EcMoUSGsCMZB+lKOLlxw8Zh/No0NVERUYlbMw1+Pz2VcoUffKOUyssRR0MGbi2CAwOH7bwYMH/fa/D2BfX18rTXrs8OHDSwoeGz3AMXwYFQ4QAMzrHBQCAFHBd0qAG657AxVISKR0cUrFiffdlNJ5aY3vwqR2zUeOHBk2S2xDQ0Mcf7l0nFJQitAYhTQEUxXfXTW90ZQHY2KhRPsLxMPFkCBpTGBNBVyZUzvOVAZNYoklllhiiSWWWGKJJZZYYon9z+xf0hZkGsED3jUAAAAASUVORK5CYII='
class Particle {
    constructor(x, y, _x, _y, col) {
        this._x = _x
        this._y = _y
        this.size = 2.5
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
        // if(!bFirstPage)
        //   return;
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
        if (!bFirstPage)
            return;
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

function MyWindowResized() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    particleDist = window.innerHeight / 180 * 2
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

function initCover() {
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
    ConnectDots()
    requestAnimationFrame(animate)
}
animate()

function ConnectDots() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < particleDist * particlesLink) {
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
                ctx.lineWidth = 0.4
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
    // scrollBar: true,
    scrollOverflow: true,
    responsiveHeight: 600,
    navigation: true,
    navigationTooltips: ['home', 'about', 'arts', 'gamejams', 'projects'],
    anchors: ['home', 'about', 'arts', 'gamejams', 'projects'],
    menu: '#myMenu',
    fitToSection: false,
    lockAnchors: true,


    afterLoad: function (anchorLink, index) {
        var loadedSection = $(this)
        // using index
        if (index == 3) {
            /* animate skill bars */
            new WOW().init();
        }
    },

    onLeave: function (origin, destination, direction, trigger) {
        var leavingSection = this;
        if (origin.index == 0) {
            bFirstPage = false;
        }
        if (destination.index == 0) {
            bFirstPage = true;
        }
    }
})

fullpage_api.setAllowScrolling(false);

var Show = function (elID) {
    fullpage_api.moveTo(elID);
    //fullpage_api.responsiveSlides.toSlides();
}

$('[lang="jp"]').hide();
var ChangeLang = function () {
    $('[lang="jp"]').toggle();
    $('[lang="en"]').toggle();
}

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
var isDragging = false;
let ms;
var idle1, idle2, idle3, idle4;
var walk1, walk2, walk3, walk4;
var myP5jsCanvas;

function setup() {
    myP5jsCanvas = createCanvas(windowWidth, windowHeight);
    myP5jsCanvas.parent('absCanvas');
    imageMode(CENTER);

    yVal = 0;
    velocity = 0;
    mass = 110;

    accel = mass * 0.05;

    idle1 = new Image();
    idle1 = loadImage("data:image/png;base64,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");
    idle2 = new Image();
    idle2 = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAkxSURBVHgB7VpnbBRXEB6bYkwzJQEBohfTInoXOBRRfhADAYQA0WMCsgREFAV+UYRAFJPQlJCEFiMQSKEpBNMESRCQUAxCYNGEbQKxHVfcy2S+d/esu/Wdr58PyZ/0yeu93bf77czOzJu3RNWoRjWqUY3ARRD5B8HCxsLOwtbCj8z/AznCFOFrYYIwU8j0AQIi+wg3C+8LC8gkpDLmCf8WbhEOENYkL8MXFg4VThVGC/sLg2vUqEGdOnWi3r17U7t27ahly5YUFhZGzEyZmZn05s0bevHiBd2/f58SExOprKwM4+ABPBDGCE8IiyjAUFsYJXwp5KCgIO7bty/v3LmTRQyXlpayIxQXF3NCQoI6p3///moMMgm/KxxCAQJ4yWgyWYPFmjxx4kS+fv06l5SUsLvAudeuXeOIiAgtGq/EGmENqkI0En4vLIU1Ro8ezXfu3GFxSfYWYPUDBw5ww4YNtfBYYT2qAvQVPsVNtGrVik+cOOGRRR3h0aNHHB4erkXfFLYgPwEu/LkwG1adOnUqp6SksD+A64wZM0aLjidTevO52MXColq1avGOHTucCkbeRH5+Pk+ePFmLPkc+SF2WYr8QltSrV49Pnz7NVQHEh3fv3nGfPn206GjyESKFRfXr1+dLly5xVSI7O5tv3brFdevWheAMYRvyMj4RZsKNz549y1WN3NxczsrK4rVr12ornyIvFlH1hfEIUDExMRwIKCoqUoLh2l27doXgUuFE8gLw1LYLefr06X4PUPaA9xhuDdGIJcHBwRD9zGwcj9BbWIg866/U4ywKCgqU4IyMDGUMMrn2BvIAmO1chCsfO3aMAw2w8vv375XoJ0+ecKNGjSA4W9ie3MQYYdnw4cN9WkF5AtyXdu0NGzZoKx8hNwIYrHsF1kUBH8hAIQLBb9++5bZt20JwoTCcXEQ/YSlmKt6cCPgCllbetm2btvIechGYATldTeGicXFx/Pr1a7vHIHdevHiRZbLv9Yeo83JycjI3bdoUgtOEDZwViwP/69Chg8p3laGwsJCPHj3K3bp1U9O3qKgou8du3rxZPf2aNWvykCFDeNeuXcoNvQEdscEFCxZoK0c6KxgzIV6/fr3dC2COCqF4KCjv4EooSgYOHGjXegsXLuTWrVvzpk2buHPnzuqm6tSpw5GRkXzhwgU1prvAuVrwyZMnteBvnRX8IxL506dPKwwMMVevXuV+/fqp9gs6G/o4WKxnz552Bc+dO1c9IPyOG7x8+TLPmDFD18PcsWNH3rJlC6enp7OrwCulBaOdhBJYxvzTGbGIzgko14xVFQZbsmSJqmpgIVjFUtzKlStVx8Meli1bpiwqTTur/SgPt2/fzt27d1fCGzduzOfOnWNXYFl54YG1adMGYyUJazkSjF5xwZw5c6wGlG4iS9eRa9euzWvWrFEJ33jBESNG8IoVK+ze1MGDB5UgPChbgNVPnTqlrrF161Z2VzA4YMAAXCufTC2oSoEmeRmsZQkEGQi+d++ezQsiOiMY2RMDIIKGhITw+PHjbbo9LINOZfPmzV12a6Ngc4MAE4pWtlzYEojQQU2aNLHaKQmdxAIkblfhCcn1aN26dSTvJ4lLkz1IPU6zZ88mSU20d+9edZ4+X/pVNHLkSIqPjycJhiRuTZ6gQQOVkVBt1XF0LHq/vHv3bqsneP78eeWOIszKOtjeuHGjCmDHjx93aInU1FTlKYgDY8eOVeNNmjRJuTGsf/jwYXYHiDfauuD8+fNxv+jmd3Ek+FMI27dvn9WAiIJIHxCGwW7fvq2i8+LFi9U+/HWm3obbITpPmzZNBTAy52WxrhrTXVhGaYPgTkaBxgYY1nZIbsxqJ5ZKYmNjSaI0HTlyhCQAqf1iKeWmEsToxo0byi0rg8xqSFIZDRs2jFavXq3GxbKKvN/KnSWPkzsQC1v9L/W13sw1HmsU/K8QFVCF2YY07ujQoUM0a9Ysevz4sXqnc3Jy1IPo0qWLEuEIECQrEiTdTtq/f796sJICaebMmTRv3jxyF0bBL19itUetQmY5OjdMmDtlyhSbroNSEzkY7yCWVJDgly5dynl5eewqMBbSm6d1Nc6XB1/uzogTzZo1s1t4GC2MtdokiZrhcDW4rCVEID18+JDk/SXpgJBUVmol0B1gLNBTiObyiA8kJSWRiMbmTVvHGwXjRb8rLhGOE5GOjJBgo5Y9AwVwZ0vBV65c0f/H2To+2Ma+OAxy5swZ+hAgEbp8G0JlSotNxKLfnR0DVUdmjx49PJrB+APIv5YVFprziC1k6rS6hG/wwCQFcaACwQrBUovFpATBlkzR2eXAgho0A+3ZtLQ0DkToZrwmpq3m/vRKchNfwcpYDg001zamIlh31KhREPsXOTEltAec+CtEI9eiOxgoMJaS6JtLiYvysAd5CExbkM9UlwO9o0CAZbBCX6x9+/aw7mryEvA9xT6IlnqXAwVoIEIw2kRyb2fJdoqtAGe+iCkmU16LQt07ePBgqx8xIXj27BnJrEflQVRnmBTYg0RWVQnheywUN7I2RHLzaj9qa+zDfNxY5T1//pzGjRun6nZ866WvsWrVKpw3VzaTyYsIgWi5oNVTRo9Zf12DCImGnJSaqsWClo4RcD9zv6lSGs+FC0+YMEH9Ztl+kqoK+1B5fEw+wM+hoaFWaQqtWfMF8XnhD8LzZCraEzCpNzbm0TqS3+6QaWVgp3AbmXL+d8KfzNsZixYtsjoPvS4yeVr60KFDy/ebVw2xTOqTb0bR2Fb9aACpwfzR2BMbFxyOY9G61UBkRcNe9s9zcJ0HgwYNKj8P+dZ83i/CP8Sl1bXRIzM3EWLIR0DwSoVrAa9evdL93702jq0rTEMnQwMdDUkdmJw4Sh2xeE10Z1Tmzbp7ESE8JP0qlYOjo6N1o64X+RB7IBIfiS1fvlzfiL02RyzcWq8lSeNA94odfWa0RKjeT6z7hoWF4bzfyORFX+I3lJDmmvkk+fgT6K7CAomiqhcl27fJfqT/jMxuLe0fffxWcgy0igt69eqlA1y6sKP5N7QjURfgQd8gP3yYBmDtKd584e6VHIcWaWKLFi10BwKpzdlo+jWZPib9RzjK8Bs8BLW+Xz8yDSLnXAnfTWP2gq/dI8g1oMoLpQ8QcMMQqkY1/IL/AdtA6MbunKU5AAAAAElFTkSuQmCC");
    idle3 = new Image();
    idle3 = loadImage("data:image/png;base64,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");
    idle4 = new Image();
    idle4 = loadImage("data:image/png;base64,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");

    walk1 = new Image();
    walk1 = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAjrSURBVHgB7VoHbFNXFL3sVfYqI2wIOyyxp1hSoUVpQLQFIlEIiA2RgLLFFkgQKNCUgtgBhJhilVVGlQBhBQoChZSmUAIkJJAdMnx7z7N/5Dh27Dh2YiQf6cj2//b3u+/ed9d7RG644YYbbrjhRlGhGDkPeHZJoYewtdBT+KXhWpYwWRgtTDK8jxX+LXxtuP/ZoILwO+ExYYyQ80GdMFK4RdiMnABHaRha6yf8WjhWWB0XS5UqRV5eXtSjRw9q27YtNW3alOrVq0fFixenT58+UUJCgmJaWhrFx8fT48eP6dKlS/To0SP8PEG4Xfiz8D9yEUBQH+F9IRcrVoxbtWrFM2fO5FOnTvH79+9Zp9NxfpCZmckPHjzghQsXcp06daD1FOFKYTkqQsAyvhLeE3KDBg145cqVHB4ezllZWewopKSk8MaNG7lixYoQ/B/hj8LiVMhoI/xdqGvfvj0fPnyYxTzZmYiMjOTJkydzyZIlIfgJ0js/pwNa9RXGQ6M7d+5U5leYuHbtGjdq1AhCw7sPIycCwvoLdSNGjOCYmBguKsTFxfHo0aMhdLpwKjkJfhB26tSpDl2j9gJre/78+XCSiNc/kIPRVZg8duxYlxAWgOeXcMYTJkyAphG+WpKD8IUwvEOHDuoPXAkSu/nt27cMxyljDCV9iCwQsG43S/LAd+/eZVeDpuUbN25o3nsmFRC9hZlLly5lVwW0LBkaz5o1CwIjJ7fbtBHcr7do0YJTU1PZVaFp+d27d+zp6Qmhg8hO9BHqgoKC2NWhaXndunUQOFFYm+xAkIeHh3qYqwORA1p++fIl16xZE0JvzUswc3kpPPPwcePGUZkyZcjVgcoLVVnlypVp9uzZuDSe8pl6DhHy7du3rc4u1hAqouDgYDXD1hAVFaXSw5MnT6qKKDk5Od/VlDkgxYVZv3r1Sis0/PMjcECtWrU4PT3d4h/A1Ldv385du3blEiVKKNauXVulfZbw8eNHNRipi7ldu3Ys1sPlypXj7t278/r16zk6OprtBSYtMTFRCe3t7Q2B/7RVWMTesFGjRll88NmzZ1XNW7duXV6yZAnfu3dPJQBVqlThEydOWBzUrVu3uHPnzpyRkaHW3YcPH5S2582bx9IU4Bo1avDBgwft1jiiCQTev38/BM4kGzsmVYRpmzZtyvVADFLWiNLSsmXL1MONJ6Jbt268aNEiiwO6evUqd+nSxaxAMO25c+cqS8EE2CM0LBJjQoiqWrUqhP7JFoG7C9XgjIF6Fx2I+vXrs7RhzP4hcu3x48dbHNCTJ0+UJqFhSzh06BCLE2Jp83B+oa1jcNiwYVrdnAumXtoTXq9169Y5Lko3g7Zs2UJiztSmTRuzM4W+lGiILEHqWJI1Tm/evLH4nd69eyuvK+GF8gv8Tqon9b5hw4Z4MWvSpgI3gHsHjSFmQp06dSJJ1M09QzXkQkJCLN4HypYtS2L2tGfPHrP3RUkUEBBAzZo1Uw2//ALCagKjUUj68GoVgfKHuczlyJEjXK1aNU5KSsp1D+tt9erVXKlSJeW88sKVK1e4QoUKfObMmRzrFEtmxYoVXLp0adX8sxcYH0x669atMOkosqEr+xs8sCngVJDF7NixI8d1DHTt2rWMimrv3r1WBwQhRYsqJA0ePJgXLFigCvnmzZsrL4/+WEGgCbxt2zatDZRrjZnWkLL2M3PNQvny5Wn69Ok0Y8YMCgsLI4mdJI01khBAolXavXs3jRkzhqzh2bNnJEk+SVKjTPvmzZv4Q5JJJplM6tevHxUEIrPxK5r6bPod0zUcJf0qtSZNsXjxYpLGnWqWS+ggibk0cuRIev78OYn3ptOnT5M1yLIgaRORFCVKcPHs1LhxY7pw4YJqxBcEEFITWJIcvGD7Rmftd4PxW5l5iyapJQ7a+82bN6uk4c6dOzaZXUREhIq1aAYidiOEIDUtKDAmLSxNnDgRkt8yJ6CpSYcI48+dO1cZZmsKWcvK7KROVh7x/v37KnGHhuDFbQG2W6SUU+9l0lQ4cQSMl+Lr19iPo+e2/vYYHJelnjNSQqSXR48eZQlFeebchQVYm+awkLO3bNkSGt5gq8BDhXzx4kX+XGCcZWG7x9DjGmVOOHP2dFkYtmrVqmwn4OoQK8t+f/nyZZh3KunlsBmoiXWyNtnVAe2i46GZc//+/S3m0XkBGcof6Eejy++qMF674PXr11F8IBQNJTuACiIBLVBXBTI9TVg40+HDh0O7IVSAjX4/1KgHDhxgV4SxZ5ZqTttgK1C6Bqf2C3Jfic3sasByi42N5eXLl8Mzw5QXkgOA5OSw5NN8/PhxdiUguzL0o8Fp5MBTSejX/irlmw7VUVEJBxM2TYhevHihnf6xqwGfFzB73tWrV9ehNWsOaNUiL0aLKK/dRnhXc9RydFM8fPiQvby8VBmKzXDj74SGhkJgxN3y5ARgTQf7+fmZHdicOXO02c5ArWsOcDADBw5U7dkhQ4Zwnz59VBe0SZMmLK0Z9vHxybWfhS0feWa4cEXfvn1z/HdgYCDuPSYnHrLzgec+f/58LmEMG9RYS/P8/f3NCozOJulP3GGHYIFwKem3OicIRwqfTpkyJcfmO3rW4pSw2x/k6+ubfR3f6dmzJ54XQE4EZnK1mLZaP8aAduTe98JAtGxMgd0GcX6wAN88nt9RGA9r0dYrXtExlesR6JBoQMtIqjYU7y3IyUDr5Bz6zDBRbbY7duyIQQ0QBqOpbgz0u2C2cu8oWT9rhVgaP23aNFWNwYQNKWPmrl27sidBupy4tosKCTWEf/Xq1UvtL2EAhrIMW62x0KYG9MTwPdIfZKto4/MHCeMGDBigLAlrXT6rfSlMwJo1a/AZB1I9qBBRR3gHmtu3b59qxMnn6bLGdUj1NE0Yjhn9a8fgcAI3FDmAIbFI2LBhg2oYisfGmv6WigA4Pbue9LONc5HeaLciZkLzkyZN0k7adCb7gMRnhPAb4VxhBun7VTPIucefrQJxEHtTpYVPpZWj2rGkP/88iBwDCIgEoxrZCWfNUF3SHyWOFN4gfWLghhuFgP8BZT2wfIXoYwgAAAAASUVORK5CYII=");
    walk2 = new Image();
    walk2 = loadImage("data:image/png;base64,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");
    walk3 = new Image();
    walk3 = loadImage("data:image/png;base64,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");
    walk4 = new Image();
    walk4 = loadImage("data:image/png;base64,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");
}


let chars = [];

class Character {
    constructor(index) {
        this.MyImage = new Image();
        this.idle = true,
            this.y = 0;
        this.x = randomNumber(10, windowWidth - 10);
        this.mass = 50;
        this.velocity = 0;
        this.accel = mass * 0.05;
        this.currentFrames = Math.floor(randomNumber(0, 4));
        this.dragging = false;
        this.IdleArray = [idle1, idle2, idle3, idle4];
        this.WalkArray = [walk1, walk2, walk3, walk4];
        this.WaitOutTime = Math.floor(randomNumber(3000, 8000));
        this.startTimer = ms;
        this.flipDirection = false;
        this.speed = Math.floor(randomNumber(1, 2.5));
        this.health = 255 + 255;
        // hidden code
        //endregion
    }

    show() {
        if (!this.dragging) {
            this.velocity += this.accel;
            this.y += this.velocity;

            if (this.y > height - this.mass / 2) {
                this.velocity *= -0.6;
                this.y = height - this.mass / 2;
            }

            if (!this.idle) {
                if (this.flipDirection)
                    this.x += this.speed;
                else
                    this.x -= this.speed;
            }

            if (this.x >= windowWidth - 30)
                this.x = windowWidth - 30;
            if (this.x <= 30)
                this.x = 30;

            if (ms - this.startTimer > this.WaitOutTime) {
                // Change State
                this.idle = !this.idle;
                this.flipDirection = randomNumber(0, 1) > 0.5 ? 1 : 0;
                this.startTimer = ms;
                // this.health -= 80;
                if (this.health > 510)
                    this.health = 510;
            }
        }

        tint(255, 255, 255, this.health - 255);
        if (this.idle) {
            if (this.flipDirection) {
                push();
                scale(-1, 1)
                image(this.IdleArray[(Math.floor(frameCount / 5) + this.currentFrames) % 4], -this.x, this.y, 60, 60);
                pop();
            } else {
                image(this.IdleArray[(Math.floor(frameCount / 5) + this.currentFrames) % 4], this.x, this.y, 60, 60);
            }
        }
        else {
            if (this.flipDirection) {
                push();
                scale(-1, 1)
                image(this.WalkArray[(Math.floor(frameCount / 5) + this.currentFrames) % 4], -this.x, this.y, 60, 60);
                pop();
            } else {
                image(this.WalkArray[(Math.floor(frameCount / 5) + this.currentFrames) % 4], this.x, this.y, 60, 60);
            }
        }
    }

    pressed(px, py) {
        if (px > this.x - 30 && px < this.x + 30 && py > this.y - 30 && py < this.y + 30) {
            this.idle = true;
            this.dragging = true;
            this.x = px;
            this.y = py;
            isDragging = true;
            this.health += 80;
            if (this.health < 255) {
                const index = chars.indexOf(this);
                if (index > -1) { // only splice array when item is found
                    chars.splice(index, 1); // 2nd parameter means remove one item only
                }
                delete (this);
            }
        }
    }

    dragged(px, py) {
        if (this.dragging) {
            this.x = px;
            this.y = py;
        }
    }

    notPressed() {
        this.dragging = false;
    }
}

function draw() {
    clear();
    ms = millis();

    for (let char of chars) {
        char.show();
    }
}

function touchStarted() {
    for (let char of chars) {
        char.pressed(mouseX, mouseY);
    }
}

function touchMoved() {
    for (let char of chars) {
        char.dragged(mouseX, mouseY);
    }
}

function touchEnded() {
    for (let char of chars) {
        char.notPressed();
    }
}

function p5jsWindowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// --------------------------------------------------------------------
let hero = document.getElementById('hero');
let slides = document.getElementById('slis');
let next = ['next', 'next-catch'].map(n => document.getElementById(n));
let prev = ['prev', 'prev-catch'].map(n => document.getElementById(n));
let slideChildren = slides.children;
let slideCount = slides.children.length;
let currentlyDemoing = false;
let currentPage = 0;
let maxPageCount = () => slideCount;

function goToPage(pageNumber = 0) {
    currentPage = Math.min(maxPageCount() - 1, Math.max(0, pageNumber));
    console.log(currentPage);
    hero.style.setProperty('--page', currentPage);
    hero.style.setProperty('vertical-align', "middle");

    slideChildren.forEach(n => n != slideChildren[currentPage] ? n.classList.remove('focus') : null);
    pageNumber in slideChildren &&
        slideChildren[pageNumber].classList.add('focus');
}

function sleep(time) {
    return new Promise(res => setTimeout(res, time));
}

function hoverSlide(index) {
    index in slideChildren &&
        slideChildren[index].classList.add('focus');
}

function unhoverSlide(index) {
    index in slideChildren &&
        slideChildren[index].classList.remove('focus');
}

async function demo() {
    if (currentlyDemoing) {
        return;
    }
    currentlyDemoing = true;
    if (currentPage !== 0) {
        goToPage(0);
        await sleep(800);
    }
    let pageSeq_ = { 2: [1, 2, 1], 3: [1, 2, 1 / 3], 4: [1, 1, 0] };
    let pageSeq = pageSeq_[slides] || pageSeq_[4];
    let slideSeq_ = { 2: [2, 4, 3], 3: [3, 6, 2], 4: [3, 6, 2] };
    let slideSeq = slideSeq_[slides] || slideSeq_[2];

    await sleep(300);
    goToPage(pageSeq[0]);
    await sleep(500);
    hoverSlide(slideSeq[0]);
    await sleep(1200);
    goToPage(pageSeq[1]);
    unhoverSlide(slideSeq[0]);
    await sleep(500);
    hoverSlide(slideSeq[1]);
    await sleep(1200);
    goToPage(pageSeq[2]);
    unhoverSlide(slideSeq[1]);
    await sleep(300);
    hoverSlide(slideSeq[2]);
    await sleep(1600);
    goToPage(0);
    unhoverSlide(slideSeq[2]);
    currentlyDemoing = false;
}

next.forEach(n => n.addEventListener('click', () => !currentlyDemoing && goToPage(currentPage + 1)));
prev.forEach(n => n.addEventListener('click', () => !currentlyDemoing && goToPage(currentPage - 1)));

sleep(100).then(demo);