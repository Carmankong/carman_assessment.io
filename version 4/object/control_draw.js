class control_draw{
    constructor(canvas){
            // set objectset to an empty list, so everything will be gone when i press reset
            this.objectSet = [];

            console.log("test object constructor");

            this.xMouse = 0;
            this.yMouse = 0;
            this.xMouseStart = 0;
            this.yMouseStart = 0;


            this.mouseDown = false;

            // Rectangle canvas co-ordinates 
            this.x = 225;
            this.y = 30;
            this.w = 500;
            this.h = 650;
            this.dx = 0;
            this.dy = 0;
            this.stroke= colArray[0][1];

            this.rectBound = false;

            this.element = canvas;

            this.element.addEventListener('mousedown', this.mDown.bind(this));
            this.element.addEventListener('mousemove', this.mMove.bind(this));
            this.element.addEventListener('mouseup', this.mUp.bind(this));

            

        }

        mDown(e){
            this.xMouseStart = e.offsetX;
            this.yMouseStart = e.offsetY;
            if(this.rectBound == true){
                    this.mouseDown = true;
        }
        //console.log(Button.selectedShape); // knowing which of the buttons is selected through console

        }

        mMove(e){
            this.xMouse = e.offsetX;
            this.yMouse = e.offsetY;
            this.rectBound = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);

            //console.log("mouse move event") 
        }

        //colArray here changes colours of the rectangle 
        mUp(e){


            if(this.mouseDown == true && this.rectBound == true){
                console.log(Swatch.selectedColour);

                // telling the program that is button
                if (Button.selectedShape == "Rectangle"){
                    var tempO = new Rectangle(this.xMouseStart, this.yMouseStart, this.dx, this.dy, Swatch.selectedColour);
                    this.objectSet.push(tempO);
                }else if(Button.selectedShape == "Ellipse"){
                    var temp = new Ellipse(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, Swatch.selectedColour);
                    this.objectSet.push(temp); 
                }

            }

        // making a reset button
        console.log(Button.selected);
        console.log(Button.selectedShape);
        if (Button.selectedShape == "Reset"){
            this.objectSet = []; // clearing the object set
            Button.selected = "";
            Button.selectedShape = ""; //deselecting the button
        } 

        // making an undo button
        if (Button.selectedShape == "Undo"){
            this.objectSet.pop(); // pop the last thing that was drawn on the screen
            Button.selected = "";
            Button.selectedShape = ""; // deselecting the button, so it won't keep on undoing the actions
        }

        this.mouseDown = false;
        }

        update(){
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h); // this rect is for boundary
            ctx.ellipse(this.x, this.y, this.Rx, this.Ry, this.r, this.Sa, this.Ea); // test ellispe
            ctx.fillStyle = colArray[0][0]; //colour
            ctx.strokeStyle = this.stroke;
            ctx.lineWidth = 5;
            ctx.fill();
            ctx.stroke();
    

            for(var i = 0; i < this.objectSet.length; i++){
                this.objectSet[i].update();
                //console.log('object set updated');
            }

            this.dx = this.xMouse - this.xMouseStart;
            this.dy = this.yMouse - this.yMouseStart;
            //give permission to draw the guide rectangle
            if(this.mouseDown == true && this.rectBound == true){
                 // this draws the rectangle (guide)
                 console.log("draw");
                this.draw();
                }
            
        }

        // this draws the rectangle (guide)
        draw(){
            this.drawRect(this.xMouseStart, this.yMouseStart, this.dx, this.dy, colArray[0][4]);

        }

        // this finction is to drag a rectangle out 
        drawRect(x,y,w,h){
            ctx.beginPath();
            ctx.rect(x,y,w,h);
            ctx.lineWidth = 1;
            ctx.strokeStyle = colArray[2][5]; // defining what colour the stroke is when we are drawing the rectangle
            ctx.stroke();
        }

        // this function is to create the boundary rectangle box
        drawBoundaryRect(x,y,w,h,col){
            ctx.beginPath();
            ctx.rect(x,y,w,h);
            ctx.lineWidth = 1;
            ctx.fillStyle = col; //determines the colour of the fill of the dragging rectangle 
            ctx.fill();
        }
    
        // this is checking boundary
        boundsCheck(xMouse, yMouse, x, y, w, h){ 
            if(xMouse > x && xMouse < x + w && yMouse > y && yMouse < y+ h){
                return true;
            }else{
                return false;
            }
            }
            
    
}
