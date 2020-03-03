
window.addEventListener('DOMContentLoaded', (event) =>{

    // let selected = {}

    let beastmax = 4
    let start = 0
    let money = 1000
    let tip = {}
    let score = 0
    let selected = {}
    let endgame = 0

    let lives = 3

    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");

    const flex = tutorial_canvas.getBoundingClientRect();

    window.addEventListener('mousedown', e => {

        xs = e.clientX - flex.left;
        ys = e.clientY - flex.top;
          tip.x = xs
          tip.y = ys


          if(squarecircle(startbutton, tip)){
              start = 1
          }


          for(let g = 0; g<grids.length; g++){
            if(squarecircle(grids[g].body, tip)){

                for(let h = 0; h<grids.length; h++){
                    grids[h].body.color = "red"
                }
                grids[g].body.color = "pink"
                selected = grids[g]
            }
        }

          if(squarecircle(acceptbutton, tip)){
              if(money >= 50){
                if((typeof selected.building.body == "undefined")){
                    selected.building = new Turret(selected.body.x+25, selected.body.y+25, "green")
                             money -= 50
                }else{
                    if( (selected.building.body.color != "green")){
                        selected.building = new Turret(selected.body.x+25, selected.body.y+25, "green")
                        money -= 50
                        }else{
                          if(selected.building.body.radius < 20){
                            selected.building.body.radius += 1
                            money -= 50
                        }
                        }
          
                }
              }
        }
          if(squarecircle(rejectbutton, tip)){
              if(money >= 100){
                if((typeof selected.building.body == "undefined")){
                    selected.building = new Turret(selected.body.x+25, selected.body.y+25, "blue")
                    money -= 100
                }else{
                    if( (selected.building.body.color != "blue")){
                        selected.building = new Turret(selected.body.x+25, selected.body.y+25, "blue")
                        money -= 100
                        }else{
                          if(selected.building.body.radius < 20){
                            selected.building.body.radius += 1
                            money -= 100
                        }
                        }
          
                }










              }
          }
    })


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas
    tutorial_canvas.style.background = "#FFFFFF"




    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

            tutorial_canvas.style.s
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }




    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.slow = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){

            // this.xmom*=.9999
            // this.ymom*=.9999   //friction

            
            if(this.slow == 0){
                this.x += this.xmom
                this.y += this.ymom
            }else{
            this.x += this.xmom/4
            this.y += this.ymom/4
            }

            if(this.x+this.radius > tutorial_canvas.width){

                if(this.xmom > 0){
                this.xmom *= -1
                money-= beastmax
                }

            }
            if(this.y+this.radius > tutorial_canvas.height){
                if(this.ymom > 0){
                this.ymom *= -1
                }

            }
            if(this.x-this.radius < 0){
                if(this.xmom < 0){
                    this.xmom *= -1
                }

            }
            if(this.y-this.radius < 0){

                if(this.ymom < 0){
                    this.ymom *= -1
                }
        
            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }
    class Atom{
        constructor(body){
            this.body = body
            this.protons = 6
            this.neutrons = 6
            this.electrons = 6
            this.radioactive = 0
            this.protonbar = new Rectangle(100, 100, 10, 10, "red")
            this.neutronbar = new Rectangle(100, 100, 10, 10, "blue")
        


        }
        draw(){
            if(this.protons < (this.neutrons-2)){
                this.radioactive = 1
            }
            this.body.draw()
            this.protonbar.x = this.body.x - 50
            this.protonbar.y = this.body.y + 20
            this.neutronbar.x = this.protonbar.x + this.protonbar.width
            this.neutronbar.y = this.body.y + 20
            this.protonbar.width = ((this.protons/(this.protons+this.neutrons))   *  (this.protons/(this.protons+this.neutrons))  ) *100
            this.neutronbar.width = ((this.neutrons/(this.protons+this.neutrons))*(this.neutrons/(this.protons+this.neutrons)))*100
            
            for(let t = 0; (this.protonbar.width+this.neutronbar.width) < 100; t++){
                this.protonbar.width*= 1.01
                this.neutronbar.width*= 1.01
            }

            tutorial_canvas_context.fillStyle = "black";
        tutorial_canvas_context.font = `${12}px Arial`
        tutorial_canvas_context.fillText(`${this.protons}`, this.protonbar.x, this.protonbar.y+30);
        tutorial_canvas_context.fillText(`${this.neutrons}`, this.neutronbar.x+this.neutronbar.width, this.neutronbar.y+30);
        tutorial_canvas_context.fillText(`${score}`, 50, 50);
        tutorial_canvas_context.fillText(`${lives}`, 650, 50);

            this.protonbar.draw()


            this.neutronbar.draw()


        }
        approve(){
            if(this.radioactive == 0){
                score++
                atoms.splice(atoms.indexOf(this), 1)
            }else{
                lives--
                atoms.splice(atoms.indexOf(this), 1)
                if(lives < 0){
                    endgame = 1
                }
            }
        }
        reject(){
            atoms.splice(atoms.indexOf(this), 1)
        }
    }
    let grids = []

    class Gridbox{
        constructor(x,y){
            this.body = new Rectangle(x, y, 50, 50, "red")
            this.building = new Circle(-100,-100, 5, "transparent")
            grids.push(this)
        }
        draw(){
            this.body.draw()
            this.building.draw()
        }
    }
    class Turret{
        constructor(x, y, color){
            this.body = new Circle(x,y, 5, color)
            this.range = new Circle(x,y, 5, color)
            this.target = beast
        }
        live(){

            for(let b = 0; b<beasts.length; b++){
                if(!intersects(this.range, this.target)){
                    this.target = beasts[Math.floor(Math.random()*beasts.length)]
                }
            }



            this.range = new Circle(this.body.x, this.body.y, this.body.radius*15, this.body.color)


            if(this.body.color == "blue"){
                if(intersects(this.range, this.target)){

                    if(this.target.health > 0){
                    let beam = new Line(this.body.x, this.body.y, this.target.x, this.target.y, this.body.color, 5)
                    beam.draw()
                    this.target.slow = 1
                    this.target.health -= (this.body.radius/20)
                    }
                }
            }else{
                if(intersects(this.range, this.target)){
                    if(this.target.health > 0){
                    let beam = new Line(this.body.x, this.body.y, this.target.x, this.target.y, this.body.color, 5)
                    beam.draw()
                this.target.health -= (this.body.radius/8)
                    }

                }
            }
        }
        draw(){
            // this.range = new Circle(this.body.x, this.body.y, this.body.radius*7, this.body.color)

            this.body.draw()
            // this.range.draw()   
            // this.live()
        }
    }
    // let x = 0
    // let y = 0

     let circ = new Circle(425, 300, 10, "black")  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    // example objects
    // let carbon12 = new Atom(circ)
    // let atoms = []
    // atoms.push(carbon12)

    let startbutton = new Rectangle ( 200, 200, 25, 50, "black")
    let acceptbutton = new Rectangle ( 200, 450, 70, 200, "green")
    let rejectbutton = new Rectangle ( 450, 450, 70, 200, "blue")
    let gridbox1 = new Gridbox(350, 350)
    let gridbox2 = new Gridbox(300, 350)
    let gridbox3 = new Gridbox(250, 350)
    let gridbox4 = new Gridbox(200, 350)
    let gridbox5 = new Gridbox(150, 350)
    let gridbox6 = new Gridbox(150, 350)
    let gridbox7 = new Gridbox(100, 350)
    let gridbox8 = new Gridbox(400, 350)
    let gridbox9 = new Gridbox(450, 350)
    let gridbox10 = new Gridbox(500, 350)
    let gridbox11 = new Gridbox(550, 350)
    let gridbox12 = new Gridbox(600, 350)
    let gridbox13 = new Gridbox(50, 350)


    let gridbox21 = new Gridbox(350, 225)
    let gridbox22 = new Gridbox(300, 225)
    let gridbox23 = new Gridbox(250, 225)
    let gridbox24 = new Gridbox(200, 225)
    let gridbox25 = new Gridbox(150, 225)
    let gridbox26 = new Gridbox(150, 225)
    let gridbox27 = new Gridbox(100, 225)
    let gridbox28 = new Gridbox(400, 225)
    let gridbox29 = new Gridbox(450, 225)
    let gridbox210 = new Gridbox(500, 225)
    let gridbox211 = new Gridbox(550, 225)
    let gridbox212 = new Gridbox(600, 225)
    let gridbox213 = new Gridbox(50, 225)

    let home = new Circle(700,312,20,"red")

    let beasts = []


    let beast = new Circle(0, 312, 15, "black", .5, 0) 
    beast.health = 1000
    beast.maxhealth = 1000
    beast.healthbar = new Rectangle ( beast.x-beast.radius, beast.y-20, 5, 20, "green")

    beasts.push(beast)

    beast = new Circle(100, 312, 15, "black", .5, 0) 
    beast.health = 1000
    beast.maxhealth = 1000
    beast.healthbar = new Rectangle ( beast.x-beast.radius, beast.y-20, 5, 20, "green")

    beasts.push(beast)

    beast = new Circle(200, 312, 15, "black", .5, 0) 
    beast.health = 1000
    beast.maxhealth = 1000
    beast.healthbar = new Rectangle ( beast.x-beast.radius, beast.y-20, 5, 20, "green")

    beasts.push(beast)

    beast = new Circle(300, 312, 15, "black", .5, 0) 
    beast.health = 1000
    beast.maxhealth = 1000
    beast.healthbar = new Rectangle ( beast.x-beast.radius, beast.y-20, 5, 20, "green")

    beasts.push(beast)



// interval, fill this with game logic 
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image
        if(start == 0){
            startbutton.draw()
        }
        if(endgame == 0){

            home.draw()
            if(start == 1){

                if(Math.random() < 0.0001){
                    beastmax++
                }
                for(let b = 0; b<beasts.length; b++){
                    if(beasts[b].health > 0){
                        beasts[b].healthbar = new Rectangle ( beasts[b].x-beasts[b].radius, beasts[b].y-(beasts[b].radius+10), 3, ((beasts[b].radius*2)*(beasts[b].health/beasts[b].maxhealth)), "green")
                        beasts[b].move()
                        beasts[b].slow = 0





        let green = Math.floor((beasts[b].health/beasts[b].maxhealth)*255)
        let red = 255 - green

        beasts[b].healthbar.color = `rgb(${red}, ${green}, 0)`


                        beasts[b].healthbar.draw()
                        beasts[b].draw()
                    }
        
                    
                }
                for(let b = 0; b<beasts.length; b++){
                    if(beasts[b].x <= 0){
                        beasts[b].x = -10000
                        beasts.splice(b,1)
                    }
                }
                for(let b = 0; b<beasts.length; b++){
                    if(beasts[b].health <= 0){
                        beasts[b].x = -10000
                        money += 10
                        // beasts.splice(b,1)
                    }
                }
    
                if(beasts.length < beastmax){
    
        beast = new Circle(0, 312, 15, "black", .5, 0) 
        beast.health = 1000
        beast.maxhealth = 1000


        beast.healthbar = new Rectangle ( beast.x-beast.radius, beast.y-20, 5, 20, "green")



    
        beasts.push(beast)
                }
    
            
        

            }

    
            tutorial_canvas_context.fillStyle = "black";
            tutorial_canvas_context.font = `${30}px Arial`
            tutorial_canvas_context.fillText(`${money}`, 50, 50);
            
        for(let g = 0; g<grids.length; g++){
            grids[g].draw()
        }
            if(start == 1){

                for(let g = 0; g<grids.length; g++){
                    if(grids[g].building.color !== "transparent"){
                        grids[g].building.live()   
        
                    }
                }
            }

            if(grids.includes(selected)){
                acceptbutton.draw()
                rejectbutton.draw()
            }
            

        }else{

            tutorial_canvas_context.fillStyle = "black";
        tutorial_canvas_context.font = `${30}px Arial`
        tutorial_canvas_context.fillText(`Radiated!`, 280, 350);
        }
    }, 1) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls
    function players(racer){
        if (keysPressed['w']) {
                racer.y -= .7
        }
        if (keysPressed['a']) {
            racer.x -= .7
        }
        if (keysPressed['s']) {
            racer.y += .7
        }
        if (keysPressed['d']) {
            racer.x += .7
        }
        if (keysPressed['f']) {
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





// can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}





})