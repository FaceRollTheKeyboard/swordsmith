/**
 * Created by mooshroom on 2017/5/19.
 */
var playerAndSword=function () {
    this.mesh=new THREE.Object3D()

    //创建身体
    var geomBody=new THREE.CubeGeometry(10,10,10)
    var matBody=new Physijs.createMaterial(
        new THREE.MeshPhongMaterial({
            color:Colors.red,
            shading:THREE.FlatShading,

        }),
        0.5,
        1
    )

    this.mesh=new Physijs.BoxMesh(geomBody,matBody,1)
    this.mesh.castShadow=true
    this.mesh.receiveShadow=true



    //控制移动
    this.moveTarget={
        x:'',
        y:"",
        z:"",
    }
    this.movePower=100
    this.move=function () {
        if(this.moveTarget.x==''||this.moveTarget.z==""){
            return
        }

        var $x=this.moveTarget.x-this.mesh.position.x
        var $z=this.moveTarget.z-this.mesh.position.z

        if(Math.abs($x)<2&&Math.abs($z)<2){
            this.mesh.setLinearVelocity({
                x:0,
                y:0,
                z:0,
            })
            this.moveTarget={x:"",y:"",z:""}
            return
        }

        //根据target的坐标计算出力方向
        var x$z=$x/$z
        var z=Math.sqrt(Math.pow(this.movePower,2)/(Math.pow(x$z,2)+1))*($z/Math.abs($z))
        var x=Math.abs(z*x$z)*($x/Math.abs($x))

        this.mesh.setLinearFactor({
            x:x,
            y:1,
            z:z
        })

    }
}

var player;
function createPlayer(){
    player=new playerAndSword();
    player.mesh.position.y=10
    player.mesh.name='player'
    scene.add(player.mesh)
}