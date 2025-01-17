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
            this.x = 360;
            this.y = 30;
            this.w = 500;
            this.h = 650;
            this.dx = 0;
            this.dy = 0;

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
            this.mouseDown = true;}
        }

        mMove(e){
            this.xMouse = e.offsetX;
            this.yMouse = e.offsetY;
            this.rectBound = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
            //console.log(this.rectBound);
            //console.log("mouse move event") 
        }

        //colArray here changes colours of the rectangle 
        mUp(e){
            var ROne = new Rectangle(this.xMouseStart, this.yMouseStart, this.dx, this.dy, colArray[2][6]);
            if(this.mouseDown == true && this.rectBound == true){
            this.objectSet.push(ROne);} // to create a rectangle
            this.mouseDown = false;
            //console.log(this.objectSet);

        }

        update(){
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = colArray[2][4]; //colour
            ctx.fill();
    

            for(var i = 0; i < this.objectSet.length; i++){
                this.objectSet[i].update();
                //console.log('object set updated');
            }

            this.dx = this.xMouse - this.xMouseStart;
            this.dy = this.yMouse - this.yMouseStart;
            //give permission to draw the guide rectangle
            //&& this.rectBounds == true
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