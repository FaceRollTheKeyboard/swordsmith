/**
 * Created by mooshroom on 2017/5/19.
 */
var playerAndSword=function () {
    this.mesh=new THREE.Object3D()

    //建议范围 0.1~1
    this.mass=.5

    //创建身体

    var geomBody=new THREE.CubeGeometry(10,10,10)
    var matBody=new Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
            color:Colors.red,
            shading:THREE.FlatShading,

        }),
        0.5,
        .5
    )

    this.mesh=new Physijs.BoxMesh(geomBody,matBody,this.mass)
    this.mesh.castShadow=true
    this.mesh.receiveShadow=true



    //控制移动
    this.moveTarget={
        x:'',
        y:"",
        z:"",
    }
    this.movePower=500
    this.move=function () {
        var $x,$z,nowV,x$z,fz,fx,$vz,$vx
        $x=this.moveTarget.x-this.mesh.position.x
        $z=this.moveTarget.z-this.mesh.position.z
        //获取当前速度
        nowV=this.mesh.getLinearVelocity()

        if(this.moveTarget.x==''||this.moveTarget.z==""){
            //没有主动出力了，物体随着空气阻力停下来
            fz=-k*nowV.z
            fx=-k*nowV.x

            //设置摩擦力为静摩擦力
            this.mesh.material._physijs.friction=1
        }else  if(Math.abs($x)<1||Math.abs($z)<1){
            fz=-k*nowV.z
            fx=-k*nowV.x
            this.moveTarget={x:"",y:"",z:""}
        }else{
            //设置摩擦力为动摩擦力
            this.mesh.material._physijs.friction=0.2
            //根据target的坐标计算出力方向
            x$z=$x/$z
            fz=Math.sqrt(Math.pow(this.movePower,2)/(Math.pow(x$z,2)+1))*($z/Math.abs($z))-k*nowV.z
            fx=Math.sqrt(Math.pow(this.movePower,2)/(Math.pow(1/x$z,2)+1))*($x/Math.abs($x))-k*nowV.x
        }


        //根据x和z方向上的力，计算出该单位时间内的变化速度
         $vz=fz*fixedTimeStep/this.mass
         $vx=fx*fixedTimeStep/this.mass

        //结合当前速度计算出最终速度
        this.mesh.setLinearVelocity({
            x:nowV.x+$vx,
            y:nowV.y,
            z:nowV.z+$vz
        })
    }

    //冲锋动作
    this.charge=function () {
        this.moveTarget={
            x:target.mesh.position.x,
            y:'',
            z:target.mesh.position.z
        }
        this.movePower=10000
        setTimeout(function () {
            player.movePower=500
        },50)
    }

    //冲锋操作 按下空格键
    document.addEventListener('keypress',function (e) {
        console.log(e)
        if(e.keyCode==32){
            player.charge()
        }
    },false)

    //急停动作
    this.stop=function () {
        this.moveTarget={x:"",y:"",z:""}
    }
    document.addEventListener('keypress',function (e) {
        console.log(e)
        if(e.keyCode==115){
            player.stop()
        }
    })
}

var player;
function createPlayer(){
    player=new playerAndSword();
    player.mesh.position.y=10
    player.mesh.name='player'
    scene.add(player.mesh)
}